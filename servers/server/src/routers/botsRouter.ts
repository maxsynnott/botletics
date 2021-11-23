import { BotController } from '../controllers/BotController'
import { createRouter } from '../helpers/createRouter'
import { postBotsSchema } from '../schemas/postBotsSchema'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'get',
		path: '/bots',
		handlers: [BotController.index],
		ensureAuthenticated: true,
	},
	{
		method: 'get',
		path: '/bots/leaderboard',
		handlers: [BotController.leaderboard],
	},
	{
		method: 'get',
		path: '/bots/:id',
		handlers: [BotController.show],
		ensureAuthenticated: true,
	},
	{
		method: 'get',
		path: '/bots/:id/games',
		handlers: [BotController.games],
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
