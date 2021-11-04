import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useCurrentUser } from '../hooks/queries/useCurrentUser'

export const ProtectedRoute = ({
	children,
	...restOfProps
}: Omit<RouteProps, 'component'>) => {
	const { data: currentUser, isLoading } = useCurrentUser({ retry: false })
	// TODO: Implement Loader
	if (isLoading) return null

	return (
		<Route {...restOfProps}>
			{currentUser ? children : <Redirect to="/signin" />}
		</Route>
	)
}
