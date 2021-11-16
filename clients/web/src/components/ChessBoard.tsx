import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { ChessInstance } from 'chess.js'
import { FC } from 'react'
import { boardToPositionedPieces } from '../helpers/boardToPositionedPieces'
import { ChessPiece } from './ChessPiece'

interface Props {
	chess: ChessInstance
}

const BOARD_SIZE = 400
const LIGHT_SQUARE_COLOR = '#EEEED2'
const DARK_SQUARE_COLOR = '#769656'

const useStyle = makeStyles({
	board: {
		width: BOARD_SIZE,
		height: BOARD_SIZE,
		backgroundImage: `
			linear-gradient(45deg, ${LIGHT_SQUARE_COLOR} 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, ${LIGHT_SQUARE_COLOR} 75%),
			linear-gradient(45deg, transparent 75%, ${LIGHT_SQUARE_COLOR} 75%),
			linear-gradient(45deg, ${LIGHT_SQUARE_COLOR} 25%, ${DARK_SQUARE_COLOR} 25%)
		`,
		backgroundSize: `${BOARD_SIZE / 4}px ${BOARD_SIZE / 4}px`,
		backgroundPosition: `
			0 0,
			0 0,
			-${BOARD_SIZE / 8}px -${BOARD_SIZE / 8}px,
			${BOARD_SIZE / 8}px ${BOARD_SIZE / 8}px
		`,
		position: 'relative',
	},
})

export const Chessboard: FC<Props> = ({ chess }) => {
	const classes = useStyle()
	const positionedPieces = boardToPositionedPieces(chess.board())

	return (
		<Box className={classes.board}>
			{positionedPieces.map(({ piece, square }) => (
				<ChessPiece piece={piece} square={square} />
			))}
		</Box>
	)
}
