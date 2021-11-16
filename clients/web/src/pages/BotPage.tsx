import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import { GamesDataGrid } from '../components/GamesDataGrid'
import { useCreateRandomGame } from '../hooks/mutations/useCreateRandomGame'
import { useBot } from '../hooks/queries/useBot'

interface Params {
	id: string
}

export const BotPage: FC = () => {
	const { id } = useParams<Params>()
	const { data: bot } = useBot(id)
	const { mutate: createRandomGame } = useCreateRandomGame()
	const queryClient = useQueryClient()
	if (!bot) return null

	const handleCreateRandomGame = () => {
		createRandomGame(
			{ botId: id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries('bots')
				},
			},
		)
	}

	return (
		<Box>
			<Typography>{bot.name}</Typography>
			<Button onClick={handleCreateRandomGame}>Create random game</Button>
			<GamesDataGrid games={bot.activeGames} />
		</Box>
	)
}
