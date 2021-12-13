import { Bot, Game } from '@prisma/client'
import { Chess } from 'chess.js'
import shuffle from 'just-shuffle'
import { db } from '../clients/db'
import { HttpException } from '../exceptions/HttpException'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import { getGameStatusFromChess } from '../helpers/getGameStatusFromChess'
import { getGameScore } from '../helpers/getGameScore'
import { runGameQueue } from '../queues/runGameQueue'
import { GameStatus } from '../types/types'
import { BotService } from './BotService'

export class GameService {
	static addToQueue = async (game: Game) => {
		try {
			await db.game.update({
				where: { id: game.id },
				data: { status: 'queued' },
			})
			await runGameQueue.add('runGame', { gameId: game.id })
		} catch (error) {
			await db.game.update({
				where: { id: game.id },
				data: { status: 'error' },
			})
			throw error
		}
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
			await this.addToQueue(game)
		}
	}

	static updateHistory = async (id: string, history: string[]) => {
		await db.game.update({ where: { id }, data: { history } })
	}

	static updateStatus = async (id: string, status: GameStatus) => {
		await db.game.update({ where: { id }, data: { status } })
	}

	// TODO: Cleaner method for refreshing of entity
	static start = async (id: string) => {
		let game = await this.getOneByIdWithBots(id)
		if (!game) throw new ResourceNotFoundException('Game not found')
		if (game.status !== 'queued')
			throw new HttpException('Game has unexpected status')

		await this.updateStatus(id, 'started')

		const { whiteBot, blackBot } = game
		const botIds = {
			w: whiteBot.id,
			b: blackBot.id,
		}

		const chess = new Chess()
		let newStatus: GameStatus | null = null
		while (!chess.game_over()) {
			const botIdToPlay = botIds[chess.turn()]

			let move
			try {
				move = await BotService.getMove({
					botId: botIdToPlay,
					gameId: id,
					fen: chess.fen(),
				})
			} catch (error) {
				newStatus =
					chess.turn() === 'w'
						? 'blackWin:invalidResponse'
						: 'whiteWin:invalidResponse'

				break
			}

			if (chess.move(move)) {
				await this.updateHistory(id, chess.history())
			} else {
				newStatus =
					chess.turn() === 'w'
						? 'blackWin:illegalMove'
						: 'whiteWin:illegalMove'

				break
			}
		}

		await this.updateHistory(id, chess.history())

		if (!newStatus) newStatus = getGameStatusFromChess(chess)
		await this.updateStatus(id, newStatus)

		const score = getGameScore(newStatus)
		await BotService.updateElos(whiteBot.id, blackBot.id, score)
	}

	static async getRandomFinished() {
		const bots = await db.$queryRawUnsafe<Game[]>(
			`select * from "Game" where status not in ('created', 'queued', 'started', 'error') order by random() limit 1`,
		)
		const bot = bots[0]
		const whiteBot = await BotService.getOneById(bot.whiteBotId)
		const blackBot = await BotService.getOneById(bot.blackBotId)
		return { ...bot, whiteBot, blackBot }
	}
}
