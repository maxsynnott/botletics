import shuffle from 'just-shuffle'
import { db } from '../clients/db'
import { GameService } from './GameService'

interface CreateArgs {
	botIds: string[]
	numOfGames: number
}

export class SetService {
	static start = async (id: string) => {
		const games = await db.game.findMany({ where: { setId: id } })

		await Promise.all(
			games.map(({ id: gameId }) => GameService.start(gameId)),
		)

		const set = await db.set.findUnique({ where: { id } })
		return set
	}

	static getSets = async () => {
		const sets = await db.set.findMany()
		return sets
	}

	static getSetById = async (id: string) => {
		const set = await db.set.findUnique({
			where: { id },
			include: { games: true, bots: true },
		})
		return set
	}

	static create = async ({ botIds, numOfGames }: CreateArgs) => {
		const gamesToCreate = Array.from({ length: numOfGames }, () => {
			const [whiteBotId, blackBotId] = shuffle(botIds)

			return {
				whiteBotId,
				blackBotId,
				positions: [
					'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
				],
			}
		})

		const set = await db.set.create({
			data: {
				bots: { connect: botIds.map((id) => ({ id })) },
				games: { createMany: { data: gamesToCreate } },
			},
		})

		return set
	}
}
