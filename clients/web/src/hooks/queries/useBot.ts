import { useQuery, UseQueryOptions } from 'react-query'
import { getBot } from '../../api/bots'
import { Bot } from '../@prisma/client'
import { GetBotResponse } from '../../types/responses'

export const useBot = (
	id: string,
	options?: UseQueryOptions<Bot, Error, GetBotResponse['data'], string[]>,
) => {
	return useQuery(['bots', id], () => getBot(id), options)
}
