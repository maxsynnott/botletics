import { useQuery, UseQueryOptions } from 'react-query'
import { getBotGames } from '../../api/bots'
import { BotGamesResponse } from '@responses'

export const useBotGames = (
	id: string,
	options?: UseQueryOptions<
		BotGamesResponse,
		Error,
		BotGamesResponse,
		string[]
	>,
) => {
	const result = useQuery(
		['bots', id, 'games'],
		() => getBotGames(id),
		options,
	)
	return { ...result, games: result.data }
}
