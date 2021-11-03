import { useMutation, useQueryClient } from 'react-query'
import { postSession } from '../../api/sessions'
import { Credentials } from '../../types/types'

export const useCreateSession = () => {
	const queryClient = useQueryClient()

	return useMutation((credentials: Credentials) => postSession(credentials), {
		onSuccess: () => {
			queryClient.invalidateQueries('users')
		},
	})
}
