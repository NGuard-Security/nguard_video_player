import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get(
  '/:v',
  function (req: Request, res: Response, next: NextFunction) {
    // https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5#Parameters

    const playerVars = {
      playsinline: 1, // for iOS support
      hl: req.query.hl || 'ko',
      color: req.query.color || 'red',
      cc_lang_pref: req.query.cc_lang_pref || null,
      rel: Number(req.query.rel) === 1 ? 1 : 0 || 0,
      loop: Number(req.query.loop) === 1 ? 1 : 0 || 0,
      muted: Number(req.query.muted) === 1 ? 1 : 0 || 0,
      controls: Number(req.query.controls) === 1 ? 1 : 0 || 1,
      autoplay: Number(req.query.autoplay) === 1 ? 1 : 0 || 1,
      disablekb: Number(req.query.disablekb) === 1 ? 1 : 0 || 0,
      start: isNaN(Number(req.query.start))
        ? null
        : Number(req.query.start),
      end: isNaN(Number(req.query.end))
        ? null
        : Number(req.query.end),
      iv_load_policy:
        Number(req.query.iv_load_policy) === 3 ? 3 : 0 || 1,
      modestbranding:
        Number(req.query.modestbranding) === 1 ? 1 : 0 || 0,
      cc_load_policy:
        Number(req.query.cc_load_policy) === 1 ? 1 : 0 || 0,
    }

    return res.render('youtube', {
      videoId: req.params.v,
      playerVars: JSON.stringify(playerVars),
    })
  },
)

module.exports = router
