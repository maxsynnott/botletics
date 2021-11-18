import { useMutation } from 'react-query'
import { postSession } from '../../api/sessions'
import { Credentials } from '../../types/types'

export const useCreateSession = () => {
	return useMutation((body: Credentials) => postSession(body))
}
