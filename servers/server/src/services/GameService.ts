import { db } from '../clients/db'
import { ChessService } from './ChessService'

export class GameService {
	static start = async (gameId: string): Promise<void> => {
		const game = await db.game.findUnique({ where: { id: gameId } })
		if (!game) throw new Error('Game not found')
		if (game.pgn) throw new Error('Game already started')

		await ChessService.run(game)
	}
}
