import { Container, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { BotStack } from '../components/BotStack'
import { useBots } from '../hooks/queries/useBots'

export const BotsPage: FC = () => {
	const { data: bots } = useBots()
	if (!bots) return null

	return (
		<Container maxWidth="sm">
			<Link to="/bots/new">Create bot</Link>
			<BotStack bots={bots} />
		</Container>
	)
}
