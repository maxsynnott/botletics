import { db } from '../clients/db'
import { ChessService } from './ChessService'

export class GameService {
	static start = async (gameId: string) => {
		const game = await db.game.findUnique({ where: { id: gameId } })
		if (!game) throw new Error('Game not found')

		const updatedGame = await ChessService.run(game)
		return updatedGame
	}
}
