import { useMutation } from 'react-query'
import { postUser } from '../../api/users'
import { Credentials } from '../../types/types'

export const useCreateUser = () => {
	return useMutation((body: Credentials) => postUser(body))
}
