import { CssBaseline } from '@mui/material'
import { HomePage } from './pages/HomePage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { SignInPage } from './pages/SignInPage'
import { BotsPage } from './pages/BotsPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignUpPage } from './pages/SignUpPage'
import { BotPage } from './pages/BotPage'
import { BotsNewPage } from './pages/BotsNewPage'
import { SetPage } from './pages/SetPage'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './components/ErrorFallback'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<CssBaseline />

					<Switch>
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
					</Switch>
				</BrowserRouter>
			</QueryClientProvider>
		</ErrorBoundary>
	)
}
