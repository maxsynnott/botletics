import { useMutation } from 'react-query'
import { postSession } from '../../api/sessions'
import { Credentials } from '../../types/types'

export const useCreateSession = () => {
	const result = useMutation((body: Credentials) => postSession(body))
	return { ...result, createSession: result.mutate }
}
