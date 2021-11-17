import { initRoutes } from './initRoutes'
import { Express } from 'express'
import { initPassport } from './initPassport'
import { initMiddleware } from './initMiddleware'
import { initErrorHandler } from './initErrorHandler'
import { initCronJobs } from './initCronJobs'

const initializers = [
	initMiddleware,
	initPassport,
	initRoutes,
	initErrorHandler,
	initCronJobs,
]

export const initApp = async (app: Express) => {
	await Promise.all(initializers.map((initializer) => initializer(app)))

	const port = process.env.PORT ?? 8080
	app.listen(port, () => console.log(`Listening on port ${port}`))
}
