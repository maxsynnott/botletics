import { db } from '../clients/db'
import { BotType } from '../types/types'

interface BotCreateData {
	userId: string
	type: BotType
	endpoint: string
}

export class BotService {
	static create = async (data: BotCreateData) => {
		const bot = await db.bot.create({ data })
		return bot
	}
}
