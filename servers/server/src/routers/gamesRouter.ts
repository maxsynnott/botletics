import { GameController } from '../controllers/GameController'
import { createRouter } from '../helpers/createRouter'
import { postGamesRandomSchema } from '../schemas/postGamesRandomSchema'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'post',
		path: '/games/random',
		handlers: [GameController.createRandom],
		ensureAuthenticated: true,
		validationSchema: postGamesRandomSchema,
	},
	{
		method: 'post',
		path: '/games/:id/start',
		handlers: [GameController.start],
		ensureAuthenticated: true,
	},
	{
		method: 'get',
		path: '/games/:id',
		handlers: [GameController.show],
	},
]

export const gamesRouter = createRouter(routes)
