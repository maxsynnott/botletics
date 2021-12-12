import { User } from '@prisma/client'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { db } from '../clients/db'
import { Express } from 'express'
import { UserService } from '../services/UserService'

const localStrategy = new LocalStrategy(
	{ usernameField: 'email' },
	async (email, password, done) => {
		const user = await UserService.authenticate(email, password)
		if (!user) return done(null, false)
		return done(null, user)
	},
)

export const initPassport = (app: Express) => {
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser(async (id: User['id'], done) => {
		const user = await db.user.findUnique({ where: { id } })
		done(null, user)
	})

	passport.use(localStrategy)

	app.use(passport.initialize())
	app.use(passport.session())
}
