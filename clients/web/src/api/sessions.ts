import { Credentials } from '../types/types'
import { axios } from '../clients/axios'

export const postSession = async (credentials: Credentials) => {
	const { status, data } = await axios.post('/sessions', credentials)

	switch (status) {
		case 201:
			return data
		default:
			throw new Error()
	}
}
