import express, { Express } from 'express'
import session from 'express-session'
import { config } from '../config/config'
import cors from 'cors'
import morgan from 'morgan'
import connectRedis from 'connect-redis'
import { redis } from '../clients/redis'

const RedisStore = connectRedis(session)

export const initMiddleware = (app: Express) => {
	app.use(express.json())
	app.use(express.urlencoded())
	app.use(
		cors({
			origin:
				config.environment === 'production'
					? ['https://botletics.live', 'https://www.botletics.live']
					: 'http://localhost:3000',
			credentials: true,
		}),
	)
	app.use(
		session({
			secret: config.session.secret,
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
			},
			store: new RedisStore({ client: redis }),
		}),
	)
	const logFormat = config.environment === 'production' ? 'combined' : 'dev'
	app.use(morgan(logFormat))
}
