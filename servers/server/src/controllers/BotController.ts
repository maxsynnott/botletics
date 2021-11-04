import { Request, Response } from 'express'
import { BotService } from '../services/BotService'
import { BotType } from '../types/types'

export class BotController {
	static index = async (req: Request, res: Response) => {
		const bots = await BotService.getAll()
		res.status(200).json(bots)
	}

	static show = async (req: Request, res: Response) => {
		const { id } = req.params

		const bot = await BotService.getOneById(id)
		res.status(200).json(bot)
	}

	static create = async (req: Request, res: Response) => {
		if (!req.user) throw new Error()

		const { id: userId } = req.user

		const { type, endpoint, name } = req.body

		const bot = await BotService.create({ userId, type, endpoint, name })

		res.status(201).json(bot)
	}

	static usersIndex = async (req: Request, res: Response) => {
		const { userId } = req.params
		const { type } = req.query

		const bots = await BotService.getAllByUserId(
			userId,
			// TODO: Include botType validation
			type as BotType | undefined,
		)
		res.status(200).json(bots)
	}
}
