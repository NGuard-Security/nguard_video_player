import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()
const supportedPlayer = [
  'html5',
  'flowplayer',
  'jwplayer',
  'videojs',
  'vjs-plus',
]

router.get(
  '/:club/:article/:index',
  function (req: Request, res: Response, next: NextFunction) {
    const clubId = isNaN(Number(req.params.club))
      ? null
      : req.params.club
    const clubName = isNaN(Number(req.params.club))
      ? req.params.club
      : null

    const playerType = req.query.p || 'vjs-plus'

    if (!supportedPlayer.includes(playerType as string)) {
      return res.status(404).send('Not Found')
    }

    return res.render(`naver/${playerType}`, {
      clubId,
      clubName,
      articleId: req.params.article,
      index: req.params.index,
      theme: playerType === 'videojs' ? req.query.theme || '' : null,
    })
  },
)

module.exports = router
