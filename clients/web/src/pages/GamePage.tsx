import { Box } from '@mui/system'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Chessboard } from '../components/Chessboard'
import { useGame } from '../hooks/queries/useGame'
import { LoadingPage } from './LoadingPage'

interface Params {
	id: string
}

export const GamePage: FC = () => {
	const { id } = useParams<Params>()
	const { data: game, isLoading } = useGame(id)
	if (isLoading) return <LoadingPage />
	if (!game) throw new Error('Game not found')

	return (
		<Box>
			<Chessboard history={game.history} />
		</Box>
	)
}
