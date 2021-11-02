import { db } from '../clients/db'
import { BotType } from '../types/types'

interface CreateArgs {
	userId: string
	type: BotType
	endpoint: string
}

export class BotService {
	static create = async (data: CreateArgs) => {
		const bot = await db.bot.create({ data })
		return bot
	}

	static getAll = async () => {
		const bots = await db.bot.findMany()
		return bots
	}
}
