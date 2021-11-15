import { axios } from '../clients/axios'
import { PostBotBody } from '../types/bodies'
import { GetBotResponse } from '../types/responses'

export const getBots = async () => {
	const { status, data } = await axios.get('/bots')

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const getBot = async (id: string) => {
	const { status, data } = await axios.get<null, GetBotResponse>(
		`/bots/${id}`,
	)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const postBot = async (body: PostBotBody) => {
	const { status, data } = await axios.post('/bots', body)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}
