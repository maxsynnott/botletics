import { axios } from '../clients/axios'
import { PostRandomGameBody } from '../types/bodies'
import { PostRandomGameResponse } from '../types/responses'

export const getGame = async (id: string) => {
	const { status, data } = await axios.get(`/games/${id}`)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const postRandomGame = async (body: PostRandomGameBody) => {
	const { status, data } = await axios.post<
		PostRandomGameBody,
		PostRandomGameResponse
	>(`/games/random`, body)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}

export const startGame = async (id: string) => {
	const { status, data } = await axios.post(`/games/${id}/start`)

	switch (status) {
		case 202:
			return data

		default:
			throw new Error()
	}
}
