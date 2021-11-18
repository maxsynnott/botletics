import { axios } from '../clients/axios'

export const getGame = async (id: string) => {
	const { status, data } = await axios.get(`/games/${id}`)

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}
