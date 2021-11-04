import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { Game } from '../types/models'
import { Chess } from 'chess.js'
import { getChessGameResult } from '../helpers/getChessGameResult'

interface Props {
	game: Game
}

export const GameGridItem: FC<Props> = ({ game: { pgn } }) => {
	const chess = new Chess()
	if (pgn) chess.load_pgn(pgn)

	return (
		<Grid item xs={4}>
			<Typography>{getChessGameResult(chess)}</Typography>
		</Grid>
	)
}
