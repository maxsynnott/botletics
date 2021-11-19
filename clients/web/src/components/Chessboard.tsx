import { IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { Chess } from 'chess.js'
import { FC, useEffect, useState } from 'react'
import { boardToPositionedPieces } from '../helpers/boardToPositionedPieces'
import { ChessPiece } from './ChessPiece'
import {
	MdChevronLeft,
	MdChevronRight,
	MdPlayArrow,
	MdPause,
} from 'react-icons/md'
import { BiReset } from 'react-icons/bi'

interface Props {
	history: string[]
}

const AUTOPLAY_SPEED = 500
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
		borderRadius: '5px',
	},
})

export const Chessboard: FC<Props> = ({ history }) => {
	const classes = useStyle()

	const [historyIndex, setHistoryIndex] = useState(0)
	const [chess, setChess] = useState(new Chess())
	const [autoPlayEnabled, setAutoPlayEnabled] = useState(false)

	const positionedPieces = boardToPositionedPieces(chess.board())

	const changeHistoryIndex = (amount: 1 | -1) => {
		if (
			(amount === 1 && historyIndex === history.length) ||
			(amount === -1 && historyIndex === 0)
		)
			return

		const chessClone = new Chess()
		chessClone.load_pgn(chess.pgn())
		amount === 1
			? chessClone.move(history[historyIndex])
			: chessClone.undo()
		setChess(chessClone)
		setHistoryIndex(historyIndex + amount)
	}

	const handleNext = () => {
		setAutoPlayEnabled(false)
		changeHistoryIndex(1)
	}

	const handlePrevious = () => {
		setAutoPlayEnabled(false)
		changeHistoryIndex(-1)
	}

	const handleToggleAutoPlay = () => setAutoPlayEnabled(!autoPlayEnabled)

	const handleReset = () => {
		setAutoPlayEnabled(false)
		const chessClone = new Chess()
		setChess(chessClone)
		setHistoryIndex(0)
	}

	useEffect(() => {
		let interval: NodeJS.Timer | undefined

		if (autoPlayEnabled) {
			interval = setInterval(() => {
				if (autoPlayEnabled) changeHistoryIndex(1)
			}, AUTOPLAY_SPEED)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [autoPlayEnabled, historyIndex, history, chess])

	return (
		<Box
			sx={{
				backgroundColor: '#555352',
				p: 1,
				pb: 0,
				borderRadius: '5px',
			}}
		>
			<Box className={classes.board}>
				{positionedPieces.map(({ piece, square }) => (
					<ChessPiece key={square} piece={piece} square={square} />
				))}
				{/* <Button onClick={handlePrevious}>previous</Button> */}
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					backgroundColor: '#555352',
					position: 'relative',
				}}
			>
				<Box sx={{ position: 'absolute', left: 0 }}>
					<IconButton onClick={handleReset} sx={{ color: 'white' }}>
						<BiReset />
					</IconButton>
				</Box>

				<IconButton onClick={handlePrevious} sx={{ color: 'white' }}>
					<MdChevronLeft />
				</IconButton>

				<IconButton
					onClick={handleToggleAutoPlay}
					sx={{ color: 'white' }}
				>
					{autoPlayEnabled ? <MdPause /> : <MdPlayArrow />}
				</IconButton>

				<IconButton onClick={handleNext} sx={{ color: 'white' }}>
					<MdChevronRight />
				</IconButton>
			</Box>
		</Box>
	)
}
