import express, { Express } from 'express'
import session from 'express-session'
import { config } from '../config/config'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { db } from '../clients/db'

export const initMiddleware = (app: Express) => {
	app.use(express.json())
	app.use(
		session({
			secret: config.session.secret,
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
			},
			store: new PrismaSessionStore(db, {
				checkPeriod: 60 * 1000,
				dbRecordIdIsSessionId: true,
			}),
		}),
	)
}
