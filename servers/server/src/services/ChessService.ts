import { Bot, Game } from '@prisma/client'
import { Chess } from 'chess.js'
import { db } from '../clients/db'
import { InvalidBotResponse } from '../exceptions/InvalidBotResponse'
import { BotService } from './BotService'
import { GameService } from './GameService'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import { HttpException } from '../exceptions/HttpException'

export class ChessService {
	static runGame = async (id: string): Promise<void> => {
		// TODO: Fix
		const game = (await GameService.getOneById(id, {
			include: { activeBot: true, passiveBot: true },
		})) as (Game & { activeBot: Bot; passiveBot: Bot }) | null
		if (!game) throw new ResourceNotFoundException('Game not found')
		if (game.history.length) throw new HttpException('Game already started')

		const [whiteBotId, blackBotId] =
			game.whiteBotType === 'active'
				? [game.activeBotId, game.passiveBotId]
				: [game.passiveBotId, game.activeBotId]

		const chess = new Chess()
		while (!chess.game_over()) {
			const botIdToPlay = chess.turn() === 'w' ? whiteBotId : blackBotId
			const move = await BotService.getMove({
				botId: botIdToPlay,
				gameId: game.id,
				fen: chess.fen(),
			})

			if (chess.move(move)) {
				await db.game.update({
					where: { id: game.id },
					data: { history: chess.history() },
				})
			} else {
				throw new InvalidBotResponse('Illegal move')
			}
		}

		await db.game.update({
			where: { id: game.id },
			data: { history: chess.history() },
		})
	}
}
