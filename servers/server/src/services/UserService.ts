import { User } from '@prisma/client'
import { db } from '../clients/db'
import { hashPassword } from '../helpers/hashPassword'
import bcrypt from 'bcrypt'

interface CreateParams {
	email: string
	username: string
	password: string
}

export class UserService {
	static create = async ({ email, username, password }: CreateParams) => {
		const passwordHash = hashPassword(password)
		const user = await db.user.create({
			data: { email, username, passwordHash },
		})

		return user
	}

	static authenticate = async (
		email: string,
		password: string,
	): Promise<User | false> => {
		const user = await db.user.findUnique({ where: { email } })
		if (!user) return false
		const correctPassword = await bcrypt.compare(
			password,
			user.passwordHash,
		)
		if (!correctPassword) return false
		return user
	}

	static authenticateAdmin = async (
		email: string,
		password: string,
	): Promise<User | false> => {
		const user = await UserService.authenticate(email, password)
		if (!user) return false
		if (!user.admin) return false

		return user
	}
}
