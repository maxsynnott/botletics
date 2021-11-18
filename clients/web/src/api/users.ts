import { axios } from '../clients/axios'
import { Credentials } from '../types/types'
import { UserCreateResponse, UserCurrentResponse } from '@responses'

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

export const postUser = async (body: Credentials) => {
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
