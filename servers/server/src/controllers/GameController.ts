import { Request, Response } from 'express'
import { GameService } from '../services/GameService'
import { GameShowResponse } from '../types/responses'

export class GameController {
	static show = async (req: Request, res: Response) => {
		const { id } = req.params
		const game = await GameService.getOneByIdWithBots(id)

		const response: GameShowResponse = game
		res.status(200).json(response)
	}
}
