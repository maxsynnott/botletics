import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useCurrentUser } from '../hooks/queries/useCurrentUser'

export const ProtectedRoute = ({ children, ...restOfProps }: RouteProps) => {
	const { data: currentUser, isLoading } = useCurrentUser({ retry: false })
	if (isLoading) return null

	return (
		<Route {...restOfProps}>
			{currentUser ? children : <Redirect to="/signin" />}
		</Route>
	)
}
