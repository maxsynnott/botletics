import { BotController } from '../controllers/BotController'
import { createRouter } from '../helpers/createRouter'
import { postBotsSchema } from '../schemas/postBotsSchema'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'get',
		path: '/users/:userId/bots',
		handlers: [BotController.usersIndex],
		ensureAuthenticated: true,
	},
	{
		method: 'get',
		path: '/bots',
		handlers: [BotController.index],
		ensureAuthenticated: true,
	},
	{
		method: 'get',
		path: '/bots/:id',
		handlers: [BotController.show],
		ensureAuthenticated: true,
	},
	{
		method: 'post',
		path: '/bots',
		handlers: [BotController.create],
		ensureAuthenticated: true,
		validationSchema: postBotsSchema,
	},
]

export const botsRouter = createRouter(routes)
