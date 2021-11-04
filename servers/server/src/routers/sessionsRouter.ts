import { Request, Response, Router } from 'express'
import passport from 'passport'
import { SessionController } from '../controllers/SessionController'

export const sessionsRouter = Router()

sessionsRouter.post(
	'/sessions',
	passport.authenticate('local'),
	SessionController.create,
)
