import { GameController } from '../controllers/GameController'
import { createRouter } from '../helpers/createRouter'
import { Route } from '../types/types'

const routes: Route[] = [
	{ method: 'get', path: '/games/random', handlers: [GameController.random] },
	{ method: 'get', path: '/games/:id', handlers: [GameController.show] },
]

export const gamesRouter = createRouter(routes)
