import { useQuery, UseQueryOptions } from 'react-query'
import { getBot } from '../../api/bots'
import { BotShowResponse } from '@responses'

export const useBot = (
	id: string,
	options?: UseQueryOptions<
		BotShowResponse,
		Error,
		BotShowResponse,
		string[]
	>,
) => {
	return useQuery(['bots', id], () => getBot(id), options)
}
