import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './components/ErrorFallback'
import { Routes } from './components/Routes'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<CssBaseline />

					<Routes />
				</BrowserRouter>
			</QueryClientProvider>
		</ErrorBoundary>
	)
}
