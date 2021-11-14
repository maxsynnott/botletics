import shuffle from 'just-shuffle'
import { db } from '../clients/db'
import { runGameQueue } from '../queues/runGameQueue'

interface CreateArgs {
	botIds: string[]
	numOfGames: number
}

export class SetService {
	static start = async (id: string): Promise<void> => {
		const games = await db.game.findMany({ where: { setId: id } })

		await Promise.all(
			games.map(({ id: gameId }) =>
				runGameQueue.add('runGame', { gameId }),
			),
		)
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
