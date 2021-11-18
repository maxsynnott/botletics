import { Box } from '@mui/system'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Chessboard } from '../components/Chessboard'
import { useGame } from '../hooks/queries/useGame'

interface Params {
	id: string
}

export const GamePage: FC = () => {
	const { id } = useParams<Params>()
	const { data: game } = useGame(id)
	if (!game) return null

	return (
		<Box>
			<Chessboard history={game.history} />
		</Box>
	)
}
