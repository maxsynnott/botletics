import { Game } from '.prisma/client'
import axios from 'axios'
import { Chess } from 'chess.js'
import { db } from '../clients/db'
import { BotType } from '../types/types'

interface CreateArgs {
	userId: string
	type: BotType
	endpoint: string
	name: string
}

interface GetMoveArgs {
	botId: string
	gameId: string
	fen: string
}

export class BotService {
	static create = async (data: CreateArgs) => {
		const bot = await db.bot.create({ data })
		return bot
	}

	static getAllNotOwnedBy = async (userId: string) => {
		const bots = await db.bot.findMany({ where: { NOT: { userId } } })
		return bots
	}

	static getOneById = async (id: string) => {
		const bot = await db.bot.findUnique({ where: { id } })
		return bot
	}

	static getMove = async ({ botId, gameId, fen }: GetMoveArgs) => {
		const bot = await db.bot.findUnique({ where: { id: botId } })
		if (!bot) throw new Error('Bot not found')

		const { data, status } = await axios.post(bot.endpoint, {
			type: 'chess',
			action: 'move',
			payload: { gameId, fen },
		})

		switch (status) {
			case 200:
				const move = data.move
				return move
			default:
				throw new Error('Unexpected status code')
		}
	}
}
