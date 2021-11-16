import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { FC } from 'react'

interface Props {
	history: string[]
}

const BOARD_SIZE = 400
const WHITE_TILE_COLOR = '#EEEED2'
const BLACK_TILE_COLOR = '#769656'

const useStyle = makeStyles({
	board: {
		width: BOARD_SIZE,
		height: BOARD_SIZE,
		backgroundImage: `
			linear-gradient(45deg, ${WHITE_TILE_COLOR} 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, ${WHITE_TILE_COLOR} 75%),
			linear-gradient(45deg, transparent 75%, ${WHITE_TILE_COLOR} 75%),
			linear-gradient(45deg, ${WHITE_TILE_COLOR} 25%, ${BLACK_TILE_COLOR} 25%)
		`,
		backgroundSize: `${BOARD_SIZE / 4}px ${BOARD_SIZE / 4}px`,
		backgroundPosition: `
			0 0,
			0 0,
			-${BOARD_SIZE / 8}px -${BOARD_SIZE / 8}px,
			${BOARD_SIZE / 8}px ${BOARD_SIZE / 8}px
		`,
	},
})

export const ChessBoard: FC<Props> = ({ history }) => {
	const classes = useStyle()
	return <Box className={classes.board}></Box>
}
