import { axios } from '../clients/axios'
import { UserCreateResponse, UserCurrentResponse } from '@responses'
import { PostUserBody } from '../types/bodies'

export const getCurrentUser = async () => {
	const { status, data } = await axios.get<UserCurrentResponse>(
		'/users/current',
	)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const postUser = async (body: PostUserBody) => {
	const { status, data } = await axios.post<UserCreateResponse>(
		'/users',
		body,
	)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}
