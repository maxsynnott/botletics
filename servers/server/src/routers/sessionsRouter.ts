import passport from 'passport'
import { SessionController } from '../controllers/SessionController'
import { createRouter } from '../helpers/createRouter'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'post',
		path: '/sessions',
		handlers: [passport.authenticate('local'), SessionController.create],
	},
]

export const sessionsRouter = createRouter(routes)
