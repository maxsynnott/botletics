import { Bot, Game } from '@prisma/client'
import shuffle from 'just-shuffle'
import { db } from '../clients/db'
import { HttpException } from '../exceptions/HttpException'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import { runGameQueue } from '../queues/runGameQueue'
import { BotService } from './BotService'

export class GameService {
	static start = async (game: Game) => {
		await runGameQueue.add('runGame', { gameId: game.id })
	}

	static getOneById = async (id: string) => {
		const game = await db.game.findUnique({ where: { id } })
		if (!game) throw new ResourceNotFoundException()
		return game
	}

	static getOneByIdWithBots = async (id: string) => {
		const game = await db.game.findUnique({
			where: { id },
			include: { whiteBot: true, blackBot: true },
		})
		if (!game) throw new ResourceNotFoundException()
		return game
	}

	static getAllByBotIdWithBots = async (botId: string) => {
		const games = await db.game.findMany({
			where: { OR: [{ whiteBotId: botId }, { blackBotId: botId }] },
			include: { whiteBot: true, blackBot: true },
		})
		return games
	}

	static create = async (whiteBot: Bot, blackBot: Bot) => {
		const game = await db.game.create({
			data: {
				whiteBot: { connect: { id: whiteBot.id } },
				blackBot: { connect: { id: blackBot.id } },
			},
		})
		return game
	}

	static scheduleGames = async () => {
		const bots = await BotService.getAllHealthy()

		for (let i = 0; i < bots.length; i += 2) {
			const gameBots = bots.slice(i, i + 2)

			if (gameBots.length === 1) {
				const fallbackBot = await BotService.getFallbackBot()
				if (!fallbackBot)
					throw new HttpException('No fallback bot found')
				gameBots.push(fallbackBot)
			}

			const [whiteBot, blackBot] = shuffle(gameBots)
			const game = await this.create(whiteBot, blackBot)
			await this.start(game)
		}
	}
}
