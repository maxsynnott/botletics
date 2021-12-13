import { GameRandomResponse, GameShowResponse } from '@responses'
import { axios } from '../clients/axios'

export const getGame = async (id: string) => {
	const { status, data } = await axios.get<GameShowResponse>(`/games/${id}`)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const getRandomGame = async () => {
	const { status, data } = await axios.get<GameRandomResponse>(
		`/games/random`,
	)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}
