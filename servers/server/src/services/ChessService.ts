import { Game } from '.prisma/client'
import { Chess, ChessInstance } from 'chess.js'
import { db } from '../clients/db'
import { BotService } from './BotService'

interface RunTurnArgs {
	chess: ChessInstance
	botId: string
	gameId: string
	positions: string[]
}

export class ChessService {
	static run = async ({
		id: gameId,
		whiteBotId,
		blackBotId,
		positions,
	}: Game) => {
		const chess = new Chess(positions.at(-1))

		let updatedGame

		while (!chess.game_over()) {
			const botIdToPlay = chess.turn() === 'w' ? whiteBotId : blackBotId
			updatedGame = await this.runTurn({
				chess,
				botId: botIdToPlay,
				gameId,
				positions,
			})
		}

		return updatedGame
	}

	private static runTurn = async ({
		chess,
		botId,
		gameId,
		positions,
	}: RunTurnArgs) => {
		const move = await BotService.getMove({
			botId,
			gameId,
			fen: chess.fen(),
		})

		if (chess.move(move)) {
			positions.push(chess.fen())
			return db.game.update({
				where: { id: gameId },
				data: { positions },
			})
		} else {
			throw new Error('Illegal move')
		}
	}
}
