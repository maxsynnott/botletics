import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { useParams } from 'react-router'
import { GamesDataGrid } from '../components/GamesDataGrid'
import { useBot } from '../hooks/queries/useBot'

interface Params {
	id: string
}

export const BotPage: FC = () => {
	const { id } = useParams<Params>()
	const { data: bot } = useBot(id)
	if (!bot) return null

	return (
		<Box>
			<Typography>{bot.name}</Typography>
			<GamesDataGrid games={bot.activeGames} />
		</Box>
	)
}
