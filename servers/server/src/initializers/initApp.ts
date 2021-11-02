import { initRoutes } from './initRoutes'
import { Express } from 'express'

const initializers = [initRoutes]

export const initApp = (app: Express) => {
	initializers.forEach((initializer) => initializer(app))
}
