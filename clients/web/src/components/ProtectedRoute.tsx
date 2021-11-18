import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useCurrentUser } from '../hooks/contexts/useCurrentUser'
import { LoadingPage } from '../pages/LoadingPage'

export const ProtectedRoute = ({
	children,
	...restOfProps
}: Omit<RouteProps, 'component'>) => {
	const { currentUser, isLoading } = useCurrentUser()
	if (isLoading) return <LoadingPage />

	return (
		<Route {...restOfProps}>
			{currentUser ? children : <Redirect to="/signin" />}
		</Route>
	)
}
