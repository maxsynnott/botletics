import axios from 'axios'
import { db } from '../clients/db'
import { InvalidBotResponse } from '../exceptions/InvalidBotResponse'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
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

	static getAll = async () => {
		const bots = await db.bot.findMany()
		return bots
	}

	static getOneById = async (id: string) => {
		const bot = await db.bot.findUnique({ where: { id } })
		if (!bot) throw new ResourceNotFoundException()
		return bot
	}

	static getMove = async ({ botId, gameId, fen }: GetMoveArgs) => {
		const bot = await db.bot.findUnique({ where: { id: botId } })
		if (!bot) throw new ResourceNotFoundException()

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
				throw new InvalidBotResponse('Unexpected status code')
		}
	}

	static getAllByUserId = async (userId: string, type?: BotType) => {
		const where = { userId, ...(type && { type }) }
		const bots = await db.bot.findMany({ where })
		return bots
	}
}
