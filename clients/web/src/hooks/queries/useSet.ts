import { useQuery, UseQueryOptions } from 'react-query'
import { getSet } from '../../api/sets'
import { Set } from '../../types/models'

export const useSet = (
	id: string,
	options?: UseQueryOptions<Set, Error, Set, string[]>,
) => {
	return useQuery(['sets', id], () => getSet(id), options)
}
