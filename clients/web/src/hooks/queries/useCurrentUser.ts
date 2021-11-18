import { useQuery, UseQueryOptions } from 'react-query'
import { getCurrentUser } from '../../api/users'
import { User } from '../@prisma/client'

export const useCurrentUser = (
	options?: UseQueryOptions<User, Error, User, string[]>,
) => {
	return useQuery(['users', 'current'], getCurrentUser, options)
}
