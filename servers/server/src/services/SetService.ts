import { db } from '../clients/db'

export class SetService {
	static getSets = async () => {
		const sets = await db.set.findMany()
		return sets
	}
}
