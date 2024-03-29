import { Request, Response } from 'express'
import { GameService } from '../services/GameService'
import { GameRandomResponse, GameShowResponse } from '../types/responses'
import omit from 'just-omit'

export class GameController {
	static show = async (req: Request, res: Response) => {
		const { id } = req.params
		const game = await GameService.getOneByIdWithBots(id)

		const response: GameShowResponse = {
			...game,
			whiteBot: omit(game.whiteBot, ['endpoint']),
			blackBot: omit(game.blackBot, ['endpoint']),
		}
		res.status(200).json(response)
	}

	static random = async (req: Request, res: Response) => {
		const game = await GameService.getRandomFinished()

		const response: GameRandomResponse = {
			...game,
			whiteBot: omit(game.whiteBot, ['endpoint']),
			blackBot: omit(game.blackBot, ['endpoint']),
		}
		res.status(200).json(response)
	}
}
