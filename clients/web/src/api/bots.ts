import { axios } from '../clients/axios'

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
