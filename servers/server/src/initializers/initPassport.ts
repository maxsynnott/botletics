import { User } from '@prisma/client'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { db } from '../clients/db'
import bcrypt from 'bcrypt'
import { Express } from 'express'

const localStrategy = new LocalStrategy(
	{ usernameField: 'email' },
	async (email, password, done) => {
		// TODO: Add error handling
		const user = await db.user.findUnique({ where: { email } })

		if (!user) {
			return done(null, false)
		}

		const correctPassword = await bcrypt.compare(
			password,
			user.passwordHash,
		)

		if (!correctPassword) return done(null, false)

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
