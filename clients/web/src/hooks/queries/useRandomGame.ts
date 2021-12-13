import { useQuery, UseQueryOptions } from 'react-query'
import { getRandomGame } from '../../api/games'
import { GameRandomResponse } from '@responses'

export const useRandomGame = (
	options?: UseQueryOptions<
		GameRandomResponse,
		Error,
		GameRandomResponse,
		string[]
	>,
) => {
	const result = useQuery(['games', 'random'], () => getRandomGame(), options)
	return { ...result, game: result.data }
}
