import { Container } from '@mui/material'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import { GamesDataGrid } from '../components/GamesDataGrid'
import { useBot } from '../hooks/queries/useBot'
import { useBotGames } from '../hooks/queries/useBotGames'
import { LoadingPage } from './LoadingPage'

interface Params {
	id: string
}

interface Props {
	setTitle: (title: string) => void
}

export const BotPage: FC<Props> = ({ setTitle }) => {
	const { id } = useParams<Params>()
	const { bot, isLoading: botIsLoading } = useBot(id)
	const { games, isLoading: gamesAreLoading } = useBotGames(id)
	useEffect(() => setTitle(bot?.name ?? 'Bot'), [bot])

	if (botIsLoading || gamesAreLoading) return <LoadingPage />
	if (!bot) throw new Error('Bot not found')
	if (!games) throw new Error('Games not found')

	return (
		<Container sx={{ py: 3, height: '100%' }}>
			<GamesDataGrid games={games} />
		</Container>
	)
}
