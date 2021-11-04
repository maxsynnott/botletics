import { db } from '../clients/db'
import { ConflictException } from '../exceptions/ConflictException'
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException'
import { ChessService } from './ChessService'

export class GameService {
	static start = async (gameId: string): Promise<void> => {
		const game = await db.game.findUnique({ where: { id: gameId } })
		if (!game) throw new ResourceNotFoundException()
		if (game.pgn) throw new ConflictException('Game already started')

		await ChessService.run(game)
	}
}
