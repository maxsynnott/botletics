import { useQuery, UseQueryOptions } from 'react-query'
import { getBots } from '../../api/bots'
import { Bot } from '../../types/types'

export const useBots = (
	options?: UseQueryOptions<Bot[], Error, Bot[], string[]>,
) => {
	return useQuery(['bots'], getBots, options)
}
