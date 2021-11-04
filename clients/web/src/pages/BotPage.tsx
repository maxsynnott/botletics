import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { useParams } from 'react-router'
import { BotStack } from '../components/BotStack'
import { BotStackItem } from '../components/BotStackItem'
import { useBot } from '../hooks/queries/useBot'
import { useCurrentUser } from '../hooks/queries/useCurrentUser'
import { useUserBots } from '../hooks/queries/useUserBots'

interface Params {
	id: string
}

export const BotPage: FC = () => {
	const { id } = useParams<Params>()
	const { data: bot } = useBot(id)
	const { data: currentUser } = useCurrentUser()
	const { data: currentUsersBots } = useUserBots(currentUser?.id as string, {
		enabled: Boolean(currentUser?.id),
	})
	if (!bot || !currentUsersBots) return null

	return (
		<Box>
			<Typography>Bot</Typography>
			<BotStackItem bot={bot} />

			<Typography>My Bots</Typography>
			<BotStack bots={currentUsersBots} />
		</Box>
	)
}
