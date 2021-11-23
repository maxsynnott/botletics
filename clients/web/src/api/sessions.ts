import { axios } from '../clients/axios'
import { SessionCreateResponse, SessionDeleteResponse } from '@responses'
import { PostSessionBody } from '../types/bodies'

export const postSession = async (body: PostSessionBody) => {
	const { status, data } = await axios.post<SessionCreateResponse>(
		'/sessions',
		body,
	)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}

export const deleteSession = async () => {
	const { status, data } = await axios.delete<SessionDeleteResponse>(
		'/sessions',
	)

	switch (status) {
		case 204:
			return data

		default:
			throw new Error()
	}
}
