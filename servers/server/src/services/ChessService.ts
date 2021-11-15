import { Bot, Game } from '@prisma/client'
import { Chess, ChessInstance } from 'chess.js'
import { db } from '../clients/db'
import { InvalidBotResponse } from '../exceptions/InvalidBotResponse'
import { getChessGameResult } from '../helpers/getChessGameResult'
import { BotService } from './BotService'
import { GameService } from './GameService'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import random from 'just-random'
import { HttpException } from '../exceptions/HttpException'

interface RunTurnArgs {
	chess: ChessInstance
	botId: string
	gameId: string
}

export class ChessService {
	static runGame = async (id: string): Promise<void> => {
		// TODO: Fix
		const game = (await GameService.getOneById(id, {
			include: { activeBot: true, passiveBot: true },
		})) as (Game & { activeBot: Bot; passiveBot: Bot }) | null
		if (!game) throw new ResourceNotFoundException('Game not found')
		if (game.pgn) throw new HttpException('Game already started')

		const whiteBotType = random(['active', 'passive'])
		const [whiteBotId, blackBotId] =
			whiteBotType === 'active'
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
					data: { pgn: chess.pgn() },
				})
			} else {
				throw new InvalidBotResponse('Illegal move')
			}
		}

		chess.header('whiteBotType', whiteBotType)
		chess.header('result', getChessGameResult(chess))

		await db.game.update({
			where: { id: game.id },
			data: { pgn: chess.pgn() },
		})
	}
}
