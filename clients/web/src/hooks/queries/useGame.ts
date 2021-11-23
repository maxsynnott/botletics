import { useQuery, UseQueryOptions } from 'react-query'
import { getGame } from '../../api/games'
import { GameShowResponse } from '@responses'

export const useGame = (
	id: string,
	options?: UseQueryOptions<
		GameShowResponse,
		Error,
		GameShowResponse,
		string[]
	>,
) => {
	const result = useQuery(['games', id], () => getGame(id), options)
	return { ...result, game: result.data }
}
