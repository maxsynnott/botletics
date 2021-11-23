import { Bot } from '@prisma/client'
import axios from 'axios'
import { db } from '../clients/db'
import { InvalidBotResponse } from '../exceptions/InvalidBotResponse'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import random from 'just-random'
import { HttpException } from '../exceptions/HttpException'
import { ConflictException } from '../exceptions/ConflictException'
import { getEloAdjustment } from '../helpers/getEloAdjustment'
import { GameScore } from '../types/types'

const BOT_LIMIT = 3

interface CreateArgs {
	userId: string
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
		const botCount = await db.bot.count({ where: { userId: data.userId } })
		if (botCount >= BOT_LIMIT)
			throw new ConflictException(
				`User cannot have more than ${BOT_LIMIT} bots`,
			)
		const bot = await db.bot.create({
			// Trims final / from endpoint
			data: { ...data, endpoint: data.endpoint.replace(/\/$/, '') },
		})
		return bot
	}

	static getOneByIdWithGames = async (id: string) => {
		const bot = await db.bot.findUnique({
			where: { id },
			include: { gamesAsWhite: true, gamesAsBlack: true },
		})
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

	static getAllByUserId = async (userId: string) => {
		const bots = await db.bot.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		})
		return bots
	}

	static getOpponent = async ({ userId }: Bot) => {
		const bots = await db.bot.findMany({
			where: { NOT: { userId } },
		})
		if (bots.length === 0) throw new HttpException('No opponent found')
		return random(bots) as Bot
	}

	static runHealthCheck = async ({ id, endpoint }: Bot) => {
		let updateStatusValue
		try {
			const { status } = await axios.get(`${endpoint}/healthcheck`)
			if (status === 200) updateStatusValue = 'healthy'
		} catch (e) {
			updateStatusValue = 'unhealthy'
		}
		await db.bot.update({
			where: { id },
			data: { status: updateStatusValue },
		})
	}

	static runHealthChecks = async () => {
		const bots = await this.getAll()
		await Promise.all(bots.map((bot) => this.runHealthCheck(bot)))
	}

	static getAllHealthy = async () => {
		const bots = await db.bot.findMany({
			where: { status: 'healthy', fallback: false },
			orderBy: { elo: 'desc' },
		})
		return bots
	}

	static getAll = async () => {
		const bots = await db.bot.findMany({
			where: { fallback: false },
		})
		return bots
	}

	static getFallbackBot = async () => {
		const bot = await db.bot.findFirst({ where: { fallback: true } })
		return bot
	}

	static updateElo = async (id: string, adjustment: number) => {
		const bot = await db.bot.findUnique({ where: { id } })
		if (!bot) throw new ResourceNotFoundException('Bot not found')
		await db.bot.update({
			where: { id },
			data: { elo: bot.elo + adjustment },
		})
	}

	static updateElos = async (
		whiteBotId: string,
		blackBotId: string,
		score: GameScore,
	) => {
		if (score === -1) throw new HttpException('Game is still ongoing')
		const [whiteBot, blackBot] = await Promise.all([
			db.bot.findUnique({ where: { id: whiteBotId } }),
			db.bot.findUnique({ where: { id: blackBotId } }),
		])
		if (!whiteBot || !blackBot)
			throw new ResourceNotFoundException('One or more bots not found')

		const eloChange = getEloAdjustment(whiteBot.elo, blackBot.elo, score)
		await Promise.all([
			this.updateElo(whiteBotId, eloChange),
			this.updateElo(blackBotId, eloChange * -1),
		])
	}

	static getTop100Bots = async () => {
		const bots = await db.bot.findMany({
			orderBy: { elo: 'desc' },
			take: 100,
		})
		return bots
	}
}
