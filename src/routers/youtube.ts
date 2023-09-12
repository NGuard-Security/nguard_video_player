import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get(
  '/:v',
  function (req: Request, res: Response, next: NextFunction) {
    return res.render('youtube', { videoId: req.params.v })
  },
)

module.exports = router
