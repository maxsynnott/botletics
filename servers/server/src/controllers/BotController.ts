import { Request, Response } from 'express'
import { UnauthenticatedException } from '../exceptions/UnauthenticatedException'
import { BotService } from '../services/BotService'
import { GameService } from '../services/GameService'
import {
	BotCreateResponse,
	BotGamesResponse,
	BotIndexResponse,
	BotLeaderboardResponse,
	BotShowResponse,
} from '../types/responses'
import omit from 'just-omit'

export class BotController {
	static index = async (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()
		const { id: userId } = req.user

		const bots = await BotService.getAllByUserId(userId)

		const response: BotIndexResponse = bots.map((bot) =>
			omit(bot, ['endpoint']),
		)
		res.status(200).json(response)
	}

	static show = async (req: Request, res: Response) => {
		const { id } = req.params
		const bot = await BotService.getOneByIdWithGames(id)

		const response: BotShowResponse = omit(bot, ['endpoint'])
		res.status(200).json(response)
	}

	static games = async (req: Request, res: Response) => {
		const { id } = req.params
		const games = await GameService.getAllByBotIdWithBots(id)

		const response: BotGamesResponse = games.map((game) => ({
			...game,
			whiteBot: omit(game.whiteBot, ['endpoint']),
			blackBot: omit(game.blackBot, ['endpoint']),
		}))
		res.status(200).json(response)
	}

	static create = async (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()

		const { id: userId } = req.user

		const { endpoint, name } = req.body

		const bot = await BotService.create({
			userId,
			endpoint,
			name,
		})

		const response: BotCreateResponse = omit(bot, ['endpoint'])
		res.status(201).json(response)
	}

	static leaderboard = async (req: Request, res: Response) => {
		const bots = await BotService.getTop100Bots()

		const response: BotLeaderboardResponse = bots.map((bot) =>
			omit(bot, ['endpoint']),
		)
		res.status(200).json(response)
	}
}
