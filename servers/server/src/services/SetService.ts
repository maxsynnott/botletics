import shuffle from 'just-shuffle'
import { db } from '../clients/db'

interface CreateArgs {
	botIds: string[]
	numOfGames: number
}

export class SetService {
	static getSets = async () => {
		const sets = await db.set.findMany()
		return sets
	}

	static getSetById = async (id: string) => {
		const set = await db.set.findUnique({ where: { id } })
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
			include: { games: true },
			data: {
				bots: { connect: botIds.map((id) => ({ id })) },
				games: { createMany: { data: gamesToCreate } },
			},
		})

		return set
	}
}
