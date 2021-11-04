import { useQuery, UseQueryOptions } from 'react-query'
import { getBot } from '../../api/bots'
import { Bot } from '../../types/models'

export const useBot = (
	id: string,
	options?: UseQueryOptions<Bot, Error, Bot, string[]>,
) => {
	return useQuery(['bots', id], () => getBot(id), options)
}
