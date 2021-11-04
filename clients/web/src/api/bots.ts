import { axios } from '../clients/axios'
import { PostBotBody } from '../types/bodies'

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
	const { status, data } = await axios.get(`/bots/${id}`)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const getUserBots = async (userId: string) => {
	const { status, data } = await axios.get(`/users/${userId}/bots`)

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
