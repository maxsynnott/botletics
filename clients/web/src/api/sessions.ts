import { Credentials } from '../types/types'
import { axios } from '../clients/axios'
import { SessionCreateResponse } from '@responses'

export const postSession = async (credentials: Credentials) => {
	const { status, data } = await axios.post<SessionCreateResponse>(
		'/sessions',
		credentials,
	)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}
