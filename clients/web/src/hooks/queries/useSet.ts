import { useQuery, UseQueryOptions } from 'react-query'
import { getSet } from '../../api/sets'
import { Set } from '../../types/models'
import { GetSetResponseData } from '../../types/responses'

export const useSet = (
	id: string,
	options?: UseQueryOptions<
		GetSetResponseData,
		Error,
		GetSetResponseData,
		string[]
	>,
) => {
	return useQuery(['sets', id], () => getSet(id), options)
}
