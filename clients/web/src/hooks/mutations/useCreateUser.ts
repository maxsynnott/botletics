import { useMutation } from 'react-query'
import { postUser } from '../../api/users'
import { PostUserBody } from '../../types/bodies'

export const useCreateUser = () => {
	const result = useMutation((body: PostUserBody) => postUser(body))
	return { ...result, createUser: result.mutate }
}
