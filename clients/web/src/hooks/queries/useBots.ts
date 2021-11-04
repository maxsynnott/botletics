import { useQuery, UseQueryOptions } from 'react-query'
import { getBots } from '../../api/bots'
import { Bot } from '../../types/models'

export const useBots = (
	options?: UseQueryOptions<Bot[], Error, Bot[], string[]>,
) => {
	return useQuery(['bots'], getBots, options)
}
