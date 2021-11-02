import { Request, Response, Router } from 'express'
import passport from 'passport'

export const sessionsRouter = Router()

sessionsRouter.post(
	'/sessions',
	passport.authenticate('local'),
	(req: Request, res: Response) => res.json(req.user),
)
