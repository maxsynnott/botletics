import { AxiosResponse } from 'axios'
import { axios } from '../clients/axios'
import { PostSetBody } from '../types/bodies'
import { Set } from '../types/models'
import { GetSetResponse } from '../types/responses'

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
	const { status, data } = await axios.get<null, GetSetResponse>(
		`/sets/${id}`,
	)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const startSet = async (id: string) => {
	const { status, data } = await axios.post(`/sets/${id}/start`)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}
