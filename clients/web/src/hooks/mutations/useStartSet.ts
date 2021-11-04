import { useMutation } from 'react-query'
import { startSet } from '../../api/sets'

export const useStartSet = () => {
	return useMutation((id: string) => startSet(id))
}
