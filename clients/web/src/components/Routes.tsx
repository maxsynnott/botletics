import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from '../layouts/Layout'
import { BotPage } from '../pages/BotPage'
import { BotsNewPage } from '../pages/BotsNewPage'
import { BotsPage } from '../pages/BotsPage'
import { GamePage } from '../pages/GamePage'
import { HomePage } from '../pages/HomePage'
import { AuthPage } from '../pages/AuthPage'
import { ProtectedRoute } from './ProtectedRoute'

export const Routes = () => {
	const [title, setTitle] = useState('Botletics')
	useEffect(() => {
		document.title =
			title === 'Botletics' ? 'Botletics' : `Botletics • ${title}`
	}, [title])

	return (
		<Layout>
			<Switch>
				<ProtectedRoute path="/bots" exact>
					<BotsPage setTitle={setTitle} />
				</ProtectedRoute>

				<ProtectedRoute path="/bots/new" exact>
					<BotsNewPage setTitle={setTitle} />
				</ProtectedRoute>

				<ProtectedRoute path="/bots/:id" exact>
					<BotPage setTitle={setTitle} />
				</ProtectedRoute>

				<ProtectedRoute path="/games/:id" exact>
					<GamePage setTitle={setTitle} />
				</ProtectedRoute>

				<Route path="/auth" exact>
					<AuthPage setTitle={setTitle} />
				</Route>

				<Route path="/" exact>
					<HomePage setTitle={setTitle} />
				</Route>
			</Switch>
		</Layout>
	)
}
