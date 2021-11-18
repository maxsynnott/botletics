import { useMutation } from 'react-query'
import { postUser } from '../../api/users'
import { Credentials } from '../../types/types'

export const useCreateUser = () => {
	const result = useMutation((body: Credentials) => postUser(body))
	return { ...result, createUser: result.mutate }
}
