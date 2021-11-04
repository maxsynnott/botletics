import { Game } from '.prisma/client'
import { Chess, ChessInstance } from 'chess.js'
import { db } from '../clients/db'
import { getChessGameResult } from '../helpers/getChessGameResult'
import { BotService } from './BotService'

interface RunTurnArgs {
	chess: ChessInstance
	botId: string
	gameId: string
}

export class ChessService {
	static run = async ({
		id: gameId,
		whiteBotId,
		blackBotId,
		pgn,
	}: Game): Promise<void> => {
		const chess = new Chess()
		if (pgn) chess.load_pgn(pgn)

		while (!chess.game_over()) {
			const botIdToPlay = chess.turn() === 'w' ? whiteBotId : blackBotId
			await this.runTurn({
				chess,
				botId: botIdToPlay,
				gameId,
			})
		}

		chess.header('Result', getChessGameResult(chess))

		await db.game.update({
			where: { id: gameId },
			data: { pgn: chess.pgn() },
		})
	}

	private static runTurn = async ({
		chess,
		botId,
		gameId,
	}: RunTurnArgs): Promise<void> => {
		const move = await BotService.getMove({
			botId,
			gameId,
			fen: chess.fen(),
		})

		if (chess.move(move)) {
			await db.game.update({
				where: { id: gameId },
				data: { pgn: chess.pgn() },
			})
		} else {
			throw new Error('Illegal move')
		}
	}
}
