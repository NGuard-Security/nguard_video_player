import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get(
  '/',
  function (req: Request, res: Response, next: NextFunction) {
    return res.render('index')
  },
)

module.exports = router
