import { initRoutes } from './initRoutes'
import { Express } from 'express'
import { initPassport } from './initPassport'
import { initMiddleware } from './initMiddleware'
import { initErrorHandler } from './initErrorHandler'

const initializers = [
	initMiddleware,
	initPassport,
	initRoutes,
	initErrorHandler,
]

export const initApp = (app: Express) => {
	initializers.forEach((initializer) => initializer(app))
}
