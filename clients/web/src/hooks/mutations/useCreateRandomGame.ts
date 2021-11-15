import { useMutation } from 'react-query'
import { postRandomGame } from '../../api/games'
import { PostRandomGameBody } from '../../types/bodies'

export const useCreateRandomGame = () => {
	return useMutation((body: PostRandomGameBody) => postRandomGame(body))
}
