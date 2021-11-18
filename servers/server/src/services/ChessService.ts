import { Chess } from 'chess.js'
import { db } from '../clients/db'
import { InvalidBotResponse } from '../exceptions/InvalidBotResponse'
import { BotService } from './BotService'
import { GameService } from './GameService'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import { HttpException } from '../exceptions/HttpException'
import { ChessResult, getChessGameResult } from '../helpers/getChessGameResult'
import { calculateNewElo } from '../helpers/calculateNewElo'

export class ChessService {
	static runGame = async (id: string): Promise<void> => {
		const game = await GameService.getOneByIdWithBots(id)
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
				await db.game.update({
					where: { id: id },
					data: { history: chess.history() },
				})
			} else {
				throw new InvalidBotResponse('Illegal move')
			}
		}

		await db.game.update({
			where: { id: id },
			data: { history: chess.history() },
		})

		// TODO: temp shit code. This can be significantly optimised
		// TODO: Previous elos should be fetched right before updating to avoid using outdated elos
		const result = getChessGameResult(chess)
		switch (result) {
			case ChessResult.WHITE_WIN:
				await db.bot.update({
					where: { id: whiteBot.id },
					data: {
						elo: calculateNewElo(whiteBot.elo, blackBot.elo, 1),
					},
				})
				await db.bot.update({
					where: { id: blackBot.id },
					data: {
						elo: calculateNewElo(blackBot.elo, whiteBot.elo, 0),
					},
				})
				break
			case ChessResult.BLACK_WIN:
				await db.bot.update({
					where: { id: whiteBot.id },
					data: {
						elo: calculateNewElo(whiteBot.elo, blackBot.elo, 0),
					},
				})
				await db.bot.update({
					where: { id: blackBot.id },
					data: {
						elo: calculateNewElo(blackBot.elo, whiteBot.elo, 1),
					},
				})
				break
			case ChessResult.DRAW:
				await db.bot.update({
					where: { id: whiteBot.id },
					data: {
						elo: calculateNewElo(whiteBot.elo, blackBot.elo, 0.5),
					},
				})
				await db.bot.update({
					where: { id: blackBot.id },
					data: {
						elo: calculateNewElo(blackBot.elo, whiteBot.elo, 0.5),
					},
				})
				break
		}
	}
}
