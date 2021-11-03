import { useQuery, UseQueryOptions } from 'react-query'
import { getCurrentUser } from '../../api/users'
import { User } from '../../types/types'

export const useCurrentUser = (
	options?: UseQueryOptions<User, Error, User, string[]>,
) => {
	return useQuery(['users', 'current'], getCurrentUser, options)
}
