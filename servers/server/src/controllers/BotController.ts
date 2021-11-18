import { NextFunction, Request, Response } from 'express'
import { UnauthenticatedException } from '../exceptions/UnauthenticatedException'
import { BotService } from '../services/BotService'
import { GameService } from '../services/GameService'
import {
	BotCreateResponse,
	BotGamesResponse,
	BotIndexResponse,
	BotShowResponse,
} from '../types/responses'

export class BotController {
	static index = async (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()
		const { id: userId } = req.user

		const bots = await BotService.getAllByUserId(userId)

		const response: BotIndexResponse = bots
		res.status(200).json(response)
	}

	static show = async (req: Request, res: Response) => {
		const { id } = req.params
		const bot = await BotService.getOneByIdWithGames(id)

		const response: BotShowResponse = bot
		res.status(200).json(response)
	}

	static games = async (req: Request, res: Response) => {
		const { id } = req.params
		const bots = await GameService.getAllByBotIdWithBots(id)

		const response: BotGamesResponse = bots
		res.status(200).json(response)
	}

	static create = async (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()

		const { id: userId } = req.user

		const { type, endpoint, name } = req.body

		const bot = await BotService.create({
			userId,
			type,
			endpoint,
			name,
		})

		const response: BotCreateResponse = bot
		res.status(201).json(response)
	}
}
