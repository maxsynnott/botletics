import { Bot, Game } from '@prisma/client'
import { Chess } from 'chess.js'
import shuffle from 'just-shuffle'
import { db } from '../clients/db'
import { HttpException } from '../exceptions/HttpException'
import { InvalidBotResponse } from '../exceptions/InvalidBotResponse'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import { getChessGameResult } from '../helpers/getChessGameResult'
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

	static updateHistory = async (id: string, history: string[]) => {
		await db.game.update({ where: { id }, data: { history } })
	}

	static run = async (id: string) => {
		const game = await this.getOneByIdWithBots(id)
		if (!game) throw new ResourceNotFoundException('Game not found')
		if (game.history.length) throw new HttpException('Game already started')
		const { whiteBot, blackBot } = game

		const chess = new Chess()
		while (!chess.game_over()) {
			const botIdToPlay = chess.turn() === 'w' ? whiteBot.id : blackBot.id
			const move = await BotService.getMove({
				botId: botIdToPlay,
				gameId: id,
				fen: chess.fen(),
			})

			if (chess.move(move)) {
				await this.updateHistory(id, chess.history())
			} else {
				throw new InvalidBotResponse('Illegal move')
			}
		}

		await this.updateHistory(id, chess.history())

		const result = getChessGameResult(chess)
		await BotService.updateElos(whiteBot.id, blackBot.id, result)
	}
}
