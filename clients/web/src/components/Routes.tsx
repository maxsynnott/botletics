import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from '../layouts/Layout'
import { BotPage } from '../pages/BotPage'
import { BotsNewPage } from '../pages/BotsNewPage'
import { BotsPage } from '../pages/BotsPage'
import { GamePage } from '../pages/GamePage'
import { HomePage } from '../pages/HomePage'
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage'
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

				<Route path="/signin" exact>
					<SignInPage setTitle={setTitle} />
				</Route>

				<Route path="/signup" exact>
					<SignUpPage setTitle={setTitle} />
				</Route>

				<Route path="/" exact>
					<HomePage setTitle={setTitle} />
				</Route>
			</Switch>
		</Layout>
	)
}
