import { UserController } from '../controllers/UserController'
import { createRouter } from '../helpers/createRouter'
import { postUsersSchema } from '../schemas/postUsersSchema'
import { Route } from '../types/types'

const routes: Route[] = [
	{
		method: 'get',
		path: '/users/current',
		handlers: [UserController.current],
		ensureAuthenticated: true,
	},
	{
		method: 'post',
		path: '/users',
		handlers: [UserController.create],
		validationSchema: postUsersSchema,
	},
]

export const usersRouter = createRouter(routes)
