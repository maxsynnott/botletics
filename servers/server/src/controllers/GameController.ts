import { Bot, Game } from '@prisma/client'
import { Request, Response } from 'express'
import { ConflictException } from '../exceptions/ConflictException'
import { ForbiddenException } from '../exceptions/ForbiddenException'
import { HttpException } from '../exceptions/HttpException'
import { BotService } from '../services/BotService'
import { GameService } from '../services/GameService'

export class GameController {
	static createRandom = async (req: Request, res: Response) => {
		const userId = req.user?.id
		if (!userId) throw new HttpException('Current user not found')
		const { botId } = req.body
		const bot = await BotService.getOneById(botId)
		if (bot.userId !== userId) {
			throw new ForbiddenException(
				"Cannot create game for another user's bot",
			)
		}
		const randomGame = await GameService.createRandom(bot)

		res.status(201).json(randomGame)
	}

	static start = async (req: Request, res: Response) => {
		const userId = req.user?.id
		if (!userId) throw new HttpException('Current user not found')
		const { id } = req.params
		// TODO: Fix
		const game = (await GameService.getOneById(id, {
			include: { activeBot: true },
		})) as Game & { activeBot: Bot }
		if (game.activeBot.userId !== userId) {
			throw new ForbiddenException(
				"Cannot start game for another user's bot",
			)
		}
		if (game.pgn) throw new ConflictException('Game already started')

		await GameService.start(game)
		res.sendStatus(202)
	}

	static show = async (req: Request, res: Response) => {
		const { id } = req.params
		const bot = await GameService.getOneById(id)
		res.json(bot)
	}
}
