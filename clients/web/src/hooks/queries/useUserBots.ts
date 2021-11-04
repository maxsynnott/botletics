import { useQuery, UseQueryOptions } from 'react-query'
import { getUserBots } from '../../api/bots'
import { Bot } from '../../types/types'

export const useUserBots = (
	userId: string,
	options?: UseQueryOptions<Bot[], Error, Bot[], string[]>,
) => {
	return useQuery(
		['bots', 'users', userId],
		() => getUserBots(userId),
		options,
	)
}
