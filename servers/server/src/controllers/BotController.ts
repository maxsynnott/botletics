import { NextFunction, Request, Response } from 'express'
import { UnauthenticatedException } from '../exceptions/UnauthenticatedException'
import { BotService } from '../services/BotService'

export class BotController {
	static index = async (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()
		const { id: userId } = req.user

		const bots = await BotService.getAllByUserId(userId, {
			orderBy: { createdAt: 'desc' },
		})

		res.status(200).json(bots)
	}

	static show = async (req: Request, res: Response) => {
		const { id } = req.params
		const bot = await BotService.getOneById(id, {
			include: { gamesAsWhite: true, gamesAsBlack: true },
		})

		res.status(200).json(bot)
	}

	static create = async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) throw new UnauthenticatedException()

		const { id: userId } = req.user

		const { type, endpoint, name } = req.body

		const bot = await BotService.create({
			userId,
			type,
			endpoint,
			name,
		})

		res.status(201).json(bot)
	}
}
