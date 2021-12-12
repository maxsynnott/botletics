import { Express } from 'express'
import { db } from '../clients/db'
import AdminJSExpress from '@adminjs/express'
import { DMMFClass } from '@prisma/client/runtime'
import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/prisma'
import { config } from '../config/config'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redis } from '../clients/redis'
import { UserService } from '../services/UserService'

const RedisStore = connectRedis(session)

export const initAdmin = (app: Express) => {
	AdminJS.registerAdapter({ Database, Resource })

	// `PrismaClient` type doesn't have _dmmf included
	const dmmf = (db as any)._dmmf as DMMFClass

	const resources = Object.values(dmmf.modelMap).map((model) => ({
		resource: { model, client: db },
	}))

	const adminJS = new AdminJS({ resources })

	const sessionOptions: session.SessionOptions = {
		secret: config.session.secret,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
		},
		store: new RedisStore({ client: redis }),
	}

	const router = AdminJSExpress.buildAuthenticatedRouter(
		adminJS,
		{
			authenticate: UserService.authenticateAdmin,
			cookiePassword: config.session.secret,
		},
		null,
		sessionOptions,
	)

	app.use(adminJS.options.rootPath, router)
}
