import { Route } from 'react-router'
import { BotPage } from '../pages/BotPage'
import { BotsNewPage } from '../pages/BotsNewPage'
import { BotsPage } from '../pages/BotsPage'
import { HomePage } from '../pages/HomePage'
import { SetPage } from '../pages/SetPage'
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage'
import { ProtectedRoute } from './ProtectedRoute'

export const Routes = () => {
	return (
		<>
			<ProtectedRoute path="/bots" exact>
				<BotsPage />
			</ProtectedRoute>

			<ProtectedRoute path="/bots/new" exact>
				<BotsNewPage />
			</ProtectedRoute>

			<ProtectedRoute path="/bots/:id" exact>
				<BotPage />
			</ProtectedRoute>

			<ProtectedRoute path="/sets/:id" exact>
				<SetPage />
			</ProtectedRoute>

			<Route path="/signin" exact>
				<SignInPage />
			</Route>

			<Route path="/signup" exact>
				<SignUpPage />
			</Route>

			<Route path="/">
				<HomePage />
			</Route>
		</>
	)
}