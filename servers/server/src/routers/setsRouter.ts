import { SetController } from '../controllers/SetController'
import { createRouter } from '../helpers/createRouter'
import { postSetsSchema } from '../schemas/postSetsSchema'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'get',
		path: '/sets/:id',
		handlers: [SetController.show],
		ensureAuthenticated: true,
	},
	{
		method: 'get',
		path: '/sets',
		handlers: [SetController.index],
		ensureAuthenticated: true,
	},
	{
		method: 'post',
		path: '/sets',
		handlers: [SetController.create],
		ensureAuthenticated: true,
		validationSchema: postSetsSchema,
	},
	{
		method: 'post',
		path: '/sets/:id/start',
		handlers: [SetController.start],
		ensureAuthenticated: true,
	},
]

export const setsRouter = createRouter(routes)
