import { useQuery, UseQueryOptions } from 'react-query'
import { getBots } from '../../api/bots'
import { Bot } from '@models'
import { BotIndexResponse } from '@responses'

export const useBots = (
	options?: UseQueryOptions<
		BotIndexResponse,
		Error,
		BotIndexResponse,
		string[]
	>,
) => {
	const result = useQuery(['bots'], getBots, options)
	return { ...result, bots: result.data }
}
