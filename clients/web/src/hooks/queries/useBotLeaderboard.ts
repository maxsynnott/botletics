import { useQuery, UseQueryOptions } from 'react-query'
import { getBotLeaderboard } from '../../api/bots'
import { BotLeaderboardResponse } from '@responses'

export const useBotLeaderboard = (
	options?: UseQueryOptions<
		BotLeaderboardResponse,
		Error,
		BotLeaderboardResponse,
		string[]
	>,
) => {
	const result = useQuery(
		['bots', 'leaderboard'],
		() => getBotLeaderboard(),
		options,
	)
	return { ...result, bots: result.data }
}
