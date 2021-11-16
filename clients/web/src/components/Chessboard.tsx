import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { Chess } from 'chess.js'
import { FC, useState } from 'react'
import { boardToPositionedPieces } from '../helpers/boardToPositionedPieces'
import { ChessPiece } from './ChessPiece'

interface Props {
	history: string[]
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

export const Chessboard: FC<Props> = ({ history }) => {
	const classes = useStyle()

	const [historyIndex, setHistoryIndex] = useState(0)
	const [chess, setChess] = useState(new Chess())

	const positionedPieces = boardToPositionedPieces(chess.board())

	const handleNext = () => {
		if (historyIndex === history.length) return
		const chessClone = new Chess()
		chessClone.load_pgn(chess.pgn())
		chessClone.move(history[historyIndex])
		setChess(chessClone)
		setHistoryIndex(historyIndex + 1)
	}

	const handlePrevious = () => {
		if (historyIndex === 0) return
		const chessClone = new Chess()
		chessClone.load_pgn(chess.pgn())
		chessClone.undo()
		setChess(chessClone)
		setHistoryIndex(historyIndex - 1)
	}

	return (
		<>
			<Box className={classes.board}>
				{positionedPieces.map(({ piece, square }) => (
					<ChessPiece key={square} piece={piece} square={square} />
				))}
				{/* <Button onClick={handlePrevious}>previous</Button> */}
			</Box>
			<Button onClick={handlePrevious}>previous</Button>
			<Button onClick={handleNext}>next</Button>
			<Typography>
				Move: {historyIndex}/{history.length}
			</Typography>
		</>
	)
}
