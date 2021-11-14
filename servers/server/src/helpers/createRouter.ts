import { Router } from 'express'
import { Route } from '../types/types'
import { createHandlers } from './createHandlers'

export const createRouter = (routes: Route[]) => {
	const router = Router()
	routes.forEach(
		({ path, method, handlers, ensureAuthenticated, validationSchema }) => {
			router
				.route(path)
				[method](
					...createHandlers(
						handlers,
						ensureAuthenticated,
						validationSchema,
					),
				)
		},
	)
	return router
}
