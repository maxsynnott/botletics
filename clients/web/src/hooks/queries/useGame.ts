import { useQuery, UseQueryOptions } from 'react-query'
import { getGame } from '../../api/games'
import { GameWithBots } from '@modelsWith'

export const useGame = (
	id: string,
	options?: UseQueryOptions<GameWithBots, Error, GameWithBots, string[]>,
) => {
	const result = useQuery(['games', id], () => getGame(id), options)
	return { ...result, game: result.data }
}
