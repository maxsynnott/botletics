import { useMutation } from 'react-query'
import { deleteSession } from '../../api/sessions'

export const useDeleteSession = () => {
	const result = useMutation(() => deleteSession())
	return { ...result, deleteSession: result.mutate }
}
