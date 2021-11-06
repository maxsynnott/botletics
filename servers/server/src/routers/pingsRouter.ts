import { PingController } from '../controllers/PingController'
import { createRouter } from '../helpers/createRouter'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'get',
		path: '/ping',
		handlers: [PingController.ping],
	},
]

export const pingsRouter = createRouter(routes)
