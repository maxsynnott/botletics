import { db } from '../clients/db'
import { hashPassword } from '../helpers/hashPassword'

export class UserService {
	static create = async (email: string, password: string) => {
		const passwordHash = hashPassword(password)
		const user = await db.user.create({ data: { email, passwordHash } })

		return user
	}
}
