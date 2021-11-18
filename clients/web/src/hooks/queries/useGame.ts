import { useQuery, UseQueryOptions } from 'react-query'
import { getGame } from '../../api/games'
import { Game } from '@models'

export const useGame = (
	id: string,
	options?: UseQueryOptions<Game, Error, Game, string[]>,
) => {
	return useQuery(['games', id], () => getGame(id), options)
}
