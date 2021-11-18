import passport from 'passport'
import { SessionController } from '../controllers/SessionController'
import { createRouter } from '../helpers/createRouter'
import { postSessionsSchema } from '../schemas/postSessionsSchema'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'post',
		path: '/sessions',
		handlers: [passport.authenticate('local'), SessionController.create],
		validationSchema: postSessionsSchema,
	},
	{
		method: 'delete',
		path: '/sessions',
		handlers: [SessionController.delete],
		ensureAuthenticated: true,
	},
]

export const sessionsRouter = createRouter(routes)
