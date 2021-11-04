import { Grid } from '@mui/material'
import { FC } from 'react'
import { Game } from '../types/models'
import { GameGridItem } from './GameGridItem'

interface Props {
	games: Game[]
}

export const GameGrid: FC<Props> = ({ games }) => {
	return (
		<Grid container>
			{games.map((game) => (
				<GameGridItem game={game} />
			))}
		</Grid>
	)
}
