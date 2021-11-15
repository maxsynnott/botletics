import { Bot, Prisma } from '@prisma/client'
import axios from 'axios'
import { db } from '../clients/db'
import { InvalidBotResponse } from '../exceptions/InvalidBotResponse'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import { BotType } from '../types/types'
import random from 'just-random'
import { HttpException } from '../exceptions/HttpException'

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

	// TODO: Improve typing to know what was included
	static getOneById = async (
		id: string,
		optionalArgs?: Partial<Prisma.BotFindUniqueArgs>,
	) => {
		const findUniqueArgs = { where: { id }, ...optionalArgs }
		const bot = await db.bot.findUnique(findUniqueArgs)
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

	static getAllByUserId = async (
		userId: string,
		args?: Prisma.BotFindManyArgs,
	) => {
		const findManyArgs = { where: { userId }, ...args }
		const bots = await db.bot.findMany(findManyArgs)
		return bots
	}

	static getOpponent = async ({ userId }: Bot) => {
		const bots = await db.bot.findMany({
			where: { NOT: { userId } },
		})
		if (bots.length === 0) throw new HttpException('No opponent found')
		return random(bots) as Bot
	}
}
