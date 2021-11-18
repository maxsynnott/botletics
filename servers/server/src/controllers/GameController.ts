import { Request, Response } from 'express'
import { GameService } from '../services/GameService'

export class GameController {
	static show = async (req: Request, res: Response) => {
		const { id } = req.params
		const bot = await GameService.getOneById(id)
		res.json(bot)
	}
}
