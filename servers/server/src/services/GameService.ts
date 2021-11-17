import { Bot, Game } from '.prisma/client'
import { Prisma } from '@prisma/client'
import random from 'just-random'
import { db } from '../clients/db'
import { HttpException } from '../exceptions/HttpException'
import { runGameQueue } from '../queues/runGameQueue'
import { BotService } from './BotService'

export class GameService {
	static start = async (game: Game) => {
		await runGameQueue.add('runGame', { gameId: game.id })
	}

	static createRandom = async (bot: Bot) => {
		const opponent = await BotService.getOpponent(bot)
		const whiteBotType = random(['active', 'passive'])
		const game = await db.game.create({
			data: {
				whiteBotType,
				activeBot: { connect: { id: bot.id } },
				passiveBot: { connect: { id: opponent.id } },
			},
		})
		return game
	}

	// TODO: Improve typing to know what was included
	static getOneById = async (
		id: string,
		optionalArgs?: Partial<Prisma.GameFindUniqueArgs>,
	) => {
		const findUniqueArgs = { where: { id }, ...optionalArgs }
		const game = await db.game.findUnique(findUniqueArgs)
		return game
	}

	static create = async (bots: [Bot, Bot]) => {
		const whiteBotType = random(['active', 'passive'])
		const game = await db.game.create({
			data: {
				whiteBotType,
				activeBot: { connect: { id: bots[0].id } },
				passiveBot: { connect: { id: bots[1].id } },
			},
		})
		return game
	}

	static scheduleGames = async () => {
		const bots = await BotService.getAllHealthy()

		for (let i = 0; i < bots.length; i += 2) {
			const activeBot = bots[i]
			let passiveBot = bots[i + 1]

			if (!passiveBot) {
				const fallbackBot = await BotService.getFallbackBot()
				if (!fallbackBot)
					throw new HttpException('No fallback bot found')
				passiveBot = fallbackBot
			}
			const game = await this.create([activeBot, passiveBot])
			await this.start(game)
		}
	}
}
