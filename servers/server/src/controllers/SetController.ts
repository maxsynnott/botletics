import { Request, Response } from 'express'
import { SetService } from '../services/SetService'

export class SetController {
	static index = async (req: Request, res: Response) => {
		const sets = await SetService.getSets()
		res.status(200).json(sets)
	}

	static start = async (req: Request, res: Response) => {
		// TODO: Ensure user is authorized to start game
		const { id } = req.params

		await SetService.start(id)
		const set = await SetService.getSetById(id)
		res.status(200).json(set)
	}

	static show = async (req: Request, res: Response) => {
		const { id } = req.params

		const set = await SetService.getSetById(id)
		res.status(200).json(set)
	}

	static create = async (req: Request, res: Response) => {
		// TODO: Ensure that current user owns the bot
		const { botIds } = req.body

		const numOfGames = 9
		const set = await SetService.create({ botIds, numOfGames })

		res.status(201).json(set)
	}
}
