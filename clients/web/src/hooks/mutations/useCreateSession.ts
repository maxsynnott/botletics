import { useMutation } from 'react-query'
import { postSession } from '../../api/sessions'
import { PostSessionBody } from '../../types/bodies'

export const useCreateSession = () => {
	const result = useMutation((body: PostSessionBody) => postSession(body))
	return { ...result, createSession: result.mutate }
}
