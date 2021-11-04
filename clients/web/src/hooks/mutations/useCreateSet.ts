import { useMutation } from 'react-query'
import { postSet } from '../../api/sets'
import { PostSetBody } from '../../types/types'

export const useCreateSet = () => {
	return useMutation((body: PostSetBody) => postSet(body))
}
