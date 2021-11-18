import { AxiosResponse } from 'axios'
import { axios } from '../clients/axios'
import { User } from '@prisma/client'
import { Credentials } from '../types/types'

export const getCurrentUser = async () => {
	const { status, data } = await axios.get('/users/current')

	switch (status) {
		case 200:
			return data

		default:
			throw new Error()
	}
}

export const postUser = async (credentials: Credentials) => {
	const { status, data } = await axios.post<Credentials, AxiosResponse<User>>(
		'/users',
		credentials,
	)

	switch (status) {
		case 201:
			return data

		default:
			throw new Error()
	}
}
