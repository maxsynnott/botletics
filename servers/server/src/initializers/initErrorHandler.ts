import { Express } from 'express'
import { errorHandler } from '../middlewares/errorHandler'

export const initErrorHandler = (app: Express) => {
	app.use(errorHandler)
}
