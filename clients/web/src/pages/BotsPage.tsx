import { Container, Typography } from '@mui/material'
import { FC } from 'react'
import { BotStack } from '../components/BotStack'
import { useBots } from '../hooks/queries/useBots'

export const BotsPage: FC = () => {
	const { data: bots } = useBots()
	if (!bots) return null

	return (
		<Container maxWidth="sm">
			<BotStack bots={bots} />
		</Container>
	)
}
