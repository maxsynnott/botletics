import { db } from '../clients/db'
import { hashPassword } from '../helpers/hashPassword'

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
}
