import { Request, Response } from 'express'
import { BotService } from '../services/BotService'

export class BotController {
	static create = async (req: Request, res: Response) => {
		if (!req.user) throw new Error()
		const { id: userId } = req.user

		const { type, endpoint } = req.body

		const bot = await BotService.create({ userId, type, endpoint })

		res.json(bot)
	}
}
