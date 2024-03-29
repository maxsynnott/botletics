import { Box } from '@mui/system'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Chessboard } from '../components/Chessboard'
import { useGame } from '../hooks/queries/useGame'
import { LoadingPage } from './LoadingPage'

interface Params {
	id: string
}

interface Props {
	setTitle: (title: string) => void
}

export const GamePage: FC<Props> = ({ setTitle }) => {
	useEffect(() => setTitle('Game'), [])

	const { id } = useParams<Params>()
	const { game, isLoading } = useGame(id)
	if (isLoading) return <LoadingPage />
	if (!game) throw new Error('Game not found')

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<Chessboard game={game} />
		</Box>
	)
}
