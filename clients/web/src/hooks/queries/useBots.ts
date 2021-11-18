import { useQuery, UseQueryOptions } from 'react-query'
import { getBots } from '../../api/bots'
import { Bot } from '@models'

export const useBots = (
	options?: UseQueryOptions<Bot[], Error, Bot[], string[]>,
) => {
	const result = useQuery(['bots'], getBots, options)
	return { ...result, bots: result.data }
}
