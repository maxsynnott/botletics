import { Request, Response } from 'express'
import { SetService } from '../services/setService'

export class SetController {
	static index = async (req: Request, res: Response) => {
		const sets = await SetService.getSets()
		res.status(200).json(sets)
	}

	static create = async (req: Request, res: Response) => {
		// TODO: Ensure that current user owns the bot
		const { botIds } = req.body

		const numOfGames = 9
		const set = await SetService.create({ botIds, numOfGames })

		res.status(201).json(set)
	}
}
