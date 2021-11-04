import { CssBaseline } from '@mui/material'
import { HomePage } from './pages/HomePage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { SignInPage } from './pages/SignInPage'
import { BotsPage } from './pages/BotsPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignUpPage } from './pages/SignUpPage'
import { BotPage } from './pages/BotPage'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<CssBaseline />

				<Switch>
					<ProtectedRoute path="/bots" exact>
						<BotsPage />
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

					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
