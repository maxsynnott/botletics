import { Request, Response } from 'express'
import { GameService } from '../services/GameService'

export class GameController {
	static start = async (req: Request, res: Response) => {
		// TODO: Ensure user is authorized to start game
		const { id } = req.params

		const updatedGame = await GameService.start(id)
		res.json(updatedGame)
	}
}
