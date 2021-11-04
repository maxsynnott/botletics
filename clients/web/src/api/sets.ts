import { AxiosResponse } from 'axios'
import { axios } from '../clients/axios'
import { PostSetBody } from '../types/types'
import { Set } from '../types/types'

export const postSet = async (body: PostSetBody) => {
	const { status, data } = await axios.post<PostSetBody, AxiosResponse<Set>>(
		'/sets',
		body,
	)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}

export const getSet = async (id: string) => {
	const { status, data } = await axios.get(`/sets/${id}`)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}
