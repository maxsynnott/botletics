import { HealthCheckController } from '../controllers/HealthCheckController'
import { createRouter } from '../helpers/createRouter'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'get',
		path: '/healthcheck',
		handlers: [HealthCheckController.healthCheck],
	},
	{
		method: 'get',
		path: '/healthcheck/outgoing',
		handlers: [HealthCheckController.outgoing],
	},
]

export const healthCheckRouter = createRouter(routes)
