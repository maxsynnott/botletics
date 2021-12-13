import { Box, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Chessboard } from '../components/Chessboard'
import { useRandomGame } from '../hooks/queries/useRandomGame'
import { LoadingPage } from './LoadingPage'

interface Props {
	setTitle: (title: string) => void
}

export const HomePage: FC<Props> = ({ setTitle }) => {
	useEffect(() => setTitle('Botletics'), [])

	const [enabled, setEnabled] = useState(true)
	const { game, isLoading } = useRandomGame({ enabled })
	useEffect(() => {
		setEnabled(!Boolean(game))
	}, [game])
	if (isLoading) return <LoadingPage />
	if (!game) throw new Error('Game not found')

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<Typography variant="h4">Random game</Typography>
			<Chessboard game={game} />
		</Box>
	)
}
