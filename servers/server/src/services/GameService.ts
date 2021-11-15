import { Bot, Game } from '.prisma/client'
import { Prisma } from '@prisma/client'
import { db } from '../clients/db'
import { ConflictException } from '../exceptions/ConflictException'
import { runGameQueue } from '../queues/runGameQueue'
import { BotService } from './BotService'

export class GameService {
	static start = async (game: Game) => {
		if (game.pgn) throw new ConflictException('Game already started')
		await runGameQueue.add('runGame', { gameId: game.id })
	}

	static createRandom = async (bot: Bot) => {
		const opponent = await BotService.getOpponent(bot)
		const game = await db.game.create({
			data: {
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
}
