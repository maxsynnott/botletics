import { useQuery, UseQueryOptions } from 'react-query'
import { getSet } from '../../api/sets'
import { Bot } from '../../types/models'

export const useSet = (
	id: string,
	options?: UseQueryOptions<Bot, Error, Bot, string[]>,
) => {
	return useQuery(['bots', id], () => getSet(id), options)
}
