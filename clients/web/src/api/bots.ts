import { axios } from '../clients/axios'
import { PostBotBody } from '../types/bodies'
import {
	BotCreateResponse,
	BotGamesResponse,
	BotIndexResponse,
	BotShowResponse,
} from '@responses'

export const getBots = async () => {
	const { status, data } = await axios.get<BotIndexResponse>('/bots')

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const getBot = async (id: string) => {
	const { status, data } = await axios.get<BotShowResponse>(`/bots/${id}`)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const getBotGames = async (id: string) => {
	const { status, data } = await axios.get<BotGamesResponse>(
		`/bots/${id}/games`,
	)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const postBot = async (body: PostBotBody) => {
	const { status, data } = await axios.post<BotCreateResponse>('/bots', body)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}
