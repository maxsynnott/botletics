import { axios } from '../clients/axios'

export const getCurrentUser = async () => {
	const { status, data } = await axios.get('/users/current')

	switch (status) {
		case 200:
			return data
		default:
			throw new Error()
	}
}
