import { CssBaseline } from '@mui/material'
import { HomePage } from './pages/HomePage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { SignInPage } from './pages/SignInPage'
import { BotsPage } from './pages/BotsPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ProtectedRoute } from './components/ProtectedRoute'

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

					<Route path="/signin" exact>
						<SignInPage />
					</Route>

					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
