import { useMutation } from 'react-query'
import { postSet } from '../../api/sets'
import { PostSetBody } from '../../types/bodies'

export const useCreateSet = () => {
	return useMutation((body: PostSetBody) => postSet(body))
}
