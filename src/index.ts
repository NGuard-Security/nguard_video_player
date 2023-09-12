import express, { Request, Response, NextFunction } from 'express'

import logger from 'morgan'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'

import fs from 'node:fs'
import path from 'node:path'
import * as dotenv from 'dotenv'

import { color } from './functions/color'

dotenv.config()

const app = express()
const routers = fs.readdirSync(path.join(__dirname, 'routers'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

console.log('------------------------------------')

for (const i in routers) {
  let pathName = '/'

  if (routers[i] != 'main.ts') {
    pathName += routers[i]
  }

  try {
    app.use(
      pathName.replace('.ts', ''),
      require(path.join(__dirname, 'routers', routers[i])),
    )
    console.log(
      color('green', '[Router]'),
      `${pathName.replace('.ts', '')} (${routers[i]}) ✅`,
    )
  } catch (error) {
    console.error(
      color('red', '[Router]'),
      `${pathName.replace('.ts', '')} (${routers[i]}) ❌ -> ${error}`,
    )
  }
}

console.log('------------------------------------')

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

app.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

app.listen(3000, () => {
  console.log(
    `${color(
      'green',
      '[App]',
    )} 🚀 NGuard Video Player is running at port 3000!`,
  )
  console.log('------------------------------------')
})
