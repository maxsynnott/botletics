import { initRoutes } from './initRoutes'
import { Express } from 'express'
import { initPassport } from './initPassport'
import { initMiddleware } from './initMiddleware'
import { initErrorHandler } from './initErrorHandler'
import { initCronJobs } from './initCronJobs'
import { initAdmin } from './initAdmin'

const initializers = [
	initAdmin,
	initMiddleware,
	initPassport,
	initRoutes,
	initErrorHandler,
	initCronJobs,
]

export const initApp = async (app: Express) => {
	for (const initializer of initializers) {
		// * Don't remove await. TS is incorrect stating it has not effect
		await initializer(app)
	}

	const port = process.env.PORT ?? 8080
	app.listen(port, () => console.log(`Listening on port ${port}`))
}
