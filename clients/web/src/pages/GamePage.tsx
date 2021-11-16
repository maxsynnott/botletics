import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Chess } from 'chess.js'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Chessboard } from '../components/Chessboard'
import { useStartGame } from '../hooks/mutations/useStartGame'
import { useGame } from '../hooks/queries/useGame'

interface Params {
	id: string
}

export const GamePage: FC = () => {
	const { id } = useParams<Params>()
	const { data: game } = useGame(id)
	const { mutate: startGame } = useStartGame()
	if (!game) return null

	const handleStartGame = () => {
		startGame(id)
	}

	return (
		<Box>
			<Chessboard history={game.history} />
			<Typography whiteSpace="pre">
				{JSON.stringify(game, null, 4)}
			</Typography>
			<Button onClick={handleStartGame}>Start game</Button>
		</Box>
	)
}