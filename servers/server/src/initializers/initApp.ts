import { initRoutes } from './initRoutes'
import { Express } from 'express'
import { initPassport } from './initPassport'
import { initMiddleware } from './initMiddleware'

const initializers = [initMiddleware, initPassport, initRoutes]

export const initApp = (app: Express) => {
	initializers.forEach((initializer) => initializer(app))
}
