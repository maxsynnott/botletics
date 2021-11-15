import { Route } from 'react-router-dom'
import { Layout } from '../layouts/Layout'
import { BotPage } from '../pages/BotPage'
import { BotsNewPage } from '../pages/BotsNewPage'
import { BotsPage } from '../pages/BotsPage'
import { HomePage } from '../pages/HomePage'
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage'
import { ProtectedRoute } from './ProtectedRoute'

export const Routes = () => {
	return (
		<Layout>
			<ProtectedRoute path="/bots" exact>
				<BotsPage />
			</ProtectedRoute>

			<ProtectedRoute path="/bots/new" exact>
				<BotsNewPage />
			</ProtectedRoute>

			<ProtectedRoute path="/bots/:id" exact>
				<BotPage />
			</ProtectedRoute>

			<Route path="/signin" exact>
				<SignInPage />
			</Route>

			<Route path="/signup" exact>
				<SignUpPage />
			</Route>

			<Route path="/" exact>
				<HomePage />
			</Route>
		</Layout>
	)
}
