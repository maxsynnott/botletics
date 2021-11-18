import React, { FC, useEffect, useState } from 'react'
import { User } from '@models'
import { useQuery } from 'react-query'
import { getCurrentUser } from '../api/users'

type _CurrentUserContext = { currentUser: User | null; isLoading: boolean }

const INITIAL_VALUE = {
	currentUser: null,
	isLoading: true,
}

export const CurrentUserContext =
	React.createContext<_CurrentUserContext>(INITIAL_VALUE)

export const CurrentUserProvider: FC = ({ children }) => {
	const [currentUser, setCurrentUser] =
		useState<_CurrentUserContext>(INITIAL_VALUE)
	const { data: user, isLoading } = useQuery(
		['users', 'current'],
		getCurrentUser,
		{ retry: false },
	)

	useEffect(
		() => setCurrentUser({ currentUser: user ?? null, isLoading }),
		[user, isLoading],
	)

	return (
		<CurrentUserContext.Provider value={currentUser} children={children} />
	)
}
