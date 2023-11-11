import axios from 'axios'
import xml2js from 'xml2js'
import { parse, HTMLElement } from 'node-html-parser'
import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get(
  '/',
  async function (req: Request, res: Response, next: NextFunction) {
    if (
      !req.query.url ||
      !(req.query.url as string).startsWith(
        'https://cafe.naver.com/',
      ) ||
      isNaN(Number(req.query.index || 0))
    ) {
      return res.status(400).send('Bad Request')
    }

    try {
      const url = req.query.url as string

      const clubName = url
        .replace('https://cafe.naver.com/', '')
        .split('/')[0]
      const articleId = url
        .replace('https://cafe.naver.com/', '')
        .split('/')[1]

      const naverApiUrl = `https://apis.naver.com/cafe-web/cafe-articleapi/v2.1/cafes/${clubName}/articles/${articleId}?useCafeId=false`

      const { data: articleData } = await axios.get(naverApiUrl)
      const articleElem = parse(
        articleData.result.article.contentHtml,
      )
      const videoDataModules: any[] = articleElem
        .querySelectorAll('script.__se_module_data')
        .map((script: HTMLElement) => {
          return script.getAttribute('data-module')
            ? JSON.parse(script.getAttribute('data-module') as string)
            : null
        })
        .filter((x: any) => x)

      const videoDataModule =
        videoDataModules[
          req.query.index ? Number(req.query.index) : 0
        ]
      if (videoDataModule?.type == 'v2_video') {
        const oembed = {
          title: articleData.result.article.subject,
          author_name: articleData.result.article.writer.nick,
          author_url: `https://cafe.naver.com/${clubName}?iframe_url=/ca-fe/cafes/${articleData.result.cafeId}/members/${articleData.result.article.writer.memberKey}`,
          type: 'video',
          width: 1280,
          height: 720,
          version: '1.0',
          provider_name: 'Naver Cafe',
          provider_url: 'https://section.cafe.naver.com/',
          thumbnail_width: 1920,
          thumbnail_height: 1080,
          thumbnail_url: videoDataModule.data.thumbnail,
          html: `<iframe width="1280" height="720" src="https://video.sskate.me/naver/${clubName}/${articleId}/${
            req.query.index || '0'
          }?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${
            articleData.result.article.subject
          }"></iframe>`,
        }

        if (req.query.format == 'xml') {
          // convert to xml, root node is <oembed>
          const builder = new xml2js.Builder({ rootName: 'oembed' })
          const xml = builder.buildObject(oembed)
          return res.type('application/xml').send(xml)
        }
        return res.json(oembed)
      }
      return res.status(404).send('Not Found')
    } catch (e) {
      return res.status(400).send('Bad Request')
    }
  },
)

module.exports = router
