import axios from 'axios'
import { parse, HTMLElement } from 'node-html-parser'
import express, { Request, Response, NextFunction } from 'express'

interface VideoSource {
    filesize: number
    mime_type: string
    res: string
    url: string
}

const router = express.Router()

router.get(
  '/',
  function (req: Request, res: Response, next: NextFunction) {
    return res.send({ happy: "hacking" })
  },
)

router.get(
  '/naverVideo',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
        let naverApiUrl = 'https://apis.naver.com/cafe-web/cafe-articleapi/v2.1/cafes/'

        if (req.query.clubId) {
            naverApiUrl += `${req.query.clubId}/articles/${req.query.articleId}?useCafeId=true`
        } else {
            naverApiUrl += `${req.query.clubName}/articles/${req.query.articleId}?useCafeId=false`
        }

        const { data: articleData } = await axios.get(naverApiUrl)
        const articleElem = parse(articleData.result.article.contentHtml)
        const videoDataModules: any[] = articleElem.querySelectorAll('script.__se_module_data').map((script: HTMLElement) => {
            return script.getAttribute('data-module') ? JSON.parse(script.getAttribute('data-module') as string) : null
        }).filter(x => x)

        const videoDataModule = videoDataModules[req.query.index ? Number(req.query.index): 0]
        if (videoDataModule?.type == 'v2_video') {
            const { data: videos } = await axios.get(
                'https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/' +
                videoDataModule.data.vid +
                '?key=' + 
                videoDataModule.data.inkey +
                '&nonce=' +
                new Date().getTime() +
                '&devt=html5_mo&prv=N&aup=N&stpb=N&cpl=ko_KR&providerEnv=real&lc=ko_KR&adi=%5B%7B%22adSystem%22%3A%22null%22%7D%5D&adu=%2F',
            )

            const videoSources: VideoSource[] = []

            videos.videos.list.forEach((video: any) => {
                videoSources.push({
                    filesize: video.size,
                    mime_type: 'video/mp4',
                    res: video.encodingOption.name,
                    url: video.source,
                })
            })

            videoSources.sort((a: VideoSource, b: VideoSource) => {
                return a.filesize - b.filesize
            })

            return res.send({
                id: videoDataModule.data.vid,
                data: {
                    sources: videoSources,
                    poster: videoDataModule.data.thumbnail,
                },
                article: {
                    title: articleData.result.article.subject,
                    author: articleData.result.article.writer.nick,
                },
                message: '동영상 정보를 성공적으로 가져왔습니다.',
                status: 200,
                success: true
            })
        } else if (videoDataModule?.type == 'v2_oembed') {
            const oembedSrc = articleElem.querySelector('iframe')?.getAttribute('src')

            if (oembedSrc) {
                if (oembedSrc.startsWith('https://www.youtube.com/')) {
                    const videoId = oembedSrc.split('https://www.youtube.com/embed/')[1].split('?')[0]

                    return res.send({
                        id: videoId,
                        data: {
                            video: 'https://youtu.be/' + videoId,
                            embedSrc: 'https://www.youtube.com/embed/' + videoId,
                            oembedSrc: oembedSrc,
                        },
                        article: {
                            title: articleData.result.article.subject,
                            author: articleData.result.article.writer.nick,
                        },
                        message: '동영상 정보를 성공적으로 가져왔습니다.',
                        status: 200,
                        success: true
                    })
                }
            } else {
                return res.send({
                    id: null,
                    data: {
                        oembedSrc: oembedSrc,
                    },
                    article: {
                        title: articleData.result.article.subject,
                        author: articleData.result.article.writer.nick,
                    },
                    message: '동영상 정보를 성공적으로 가져왔습니다.',
                    status: 200,
                    success: true
                })
            }
        } else {
            return res.status(404).send({
                id: null,
                data: {},
                article: {},
                message: '존재하지 않는 게시글입니다.',
                status: 404,
                success: false
            })
        }
    } catch (err: any) {
        console.error(err)
        return res.status(500).send({
            id: null,
            data: {},
            article: {},
            message: '내부 서버 오류가 발생했습니다.',
            status: 500,
            success: false
        })
    }
  },
)

module.exports = router
