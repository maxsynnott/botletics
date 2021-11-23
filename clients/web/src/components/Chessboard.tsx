import { Button, Divider, IconButton, Slider, Typography } from '@mui/material'
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
	MdSettings,
} from 'react-icons/md'
import { BiReset } from 'react-icons/bi'
import { GameShowResponse } from '@responses'
import { FaChessPawn } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface Props {
	game: GameShowResponse
}

const AUTOPLAY_LEVELS = [
	0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000,
].reverse()
const DEFAULT_AUTOPLAY_LEVEL = AUTOPLAY_LEVELS.indexOf(1000)
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

export const Chessboard: FC<Props> = ({
	game: { history, blackBot, whiteBot },
}) => {
	const classes = useStyle()

	const [autoplayLevel, setAutoplayLevel] = useState(DEFAULT_AUTOPLAY_LEVEL)
	const [historyIndex, setHistoryIndex] = useState(0)
	const [chess, setChess] = useState(new Chess())
	const [autoPlayEnabled, setAutoPlayEnabled] = useState(false)
	const [settingsOpen, setSettingsOpen] = useState(false)

	const positionedPieces = boardToPositionedPieces(chess.board())

	const changeHistoryIndex = (amount: 1 | -1) => {
		if (amount === 1 && historyIndex === history.length) {
			setAutoPlayEnabled(false)
			return
		}
		if (amount === -1 && historyIndex === 0) return

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

	const toggleAutoPlay = () => {
		if (historyIndex === history.length) handleReset()
		setAutoPlayEnabled(!autoPlayEnabled)
	}

	const toggleSettingsOpen = () => setSettingsOpen(!settingsOpen)

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
			}, AUTOPLAY_LEVELS[autoplayLevel])
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [autoPlayEnabled, historyIndex, history, chess, autoplayLevel])

	return (
		<Box
			sx={{
				backgroundColor: '#555352',
				p: 1,
				pb: 0,
				borderRadius: '5px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Button
					component={Link}
					to={`/bots/${whiteBot.id}`}
					variant="contained"
					endIcon={<FaChessPawn size={14} color={'white'} />}
					sx={{
						textTransform: 'none',
						backgroundColor: DARK_SQUARE_COLOR,
						color: 'white',
						':hover': { backgroundColor: DARK_SQUARE_COLOR },
					}}
				>
					{whiteBot.name}
				</Button>
				<Button
					component={Link}
					to={`/bots/${blackBot.id}`}
					variant="contained"
					startIcon={<FaChessPawn size={14} color={'black'} />}
					sx={{
						textTransform: 'none',
						backgroundColor: DARK_SQUARE_COLOR,
						color: 'black',
						':hover': { backgroundColor: DARK_SQUARE_COLOR },
					}}
				>
					{blackBot.name}
				</Button>
			</Box>
			<Divider
				sx={{
					my: 1,
					backgroundColor: LIGHT_SQUARE_COLOR,
					opacity: 0.25,
				}}
			/>
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

				<IconButton onClick={toggleAutoPlay} sx={{ color: 'white' }}>
					{autoPlayEnabled ? <MdPause /> : <MdPlayArrow />}
				</IconButton>

				<IconButton onClick={handleNext} sx={{ color: 'white' }}>
					<MdChevronRight />
				</IconButton>

				<Box sx={{ position: 'absolute', right: 0 }}>
					<IconButton
						onClick={toggleSettingsOpen}
						sx={{ color: 'white' }}
					>
						<MdSettings />
					</IconButton>
				</Box>
			</Box>
			{settingsOpen && (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						pb: 1,
						pl: 1,
						pr: 2,
					}}
				>
					<Typography
						variant="caption"
						sx={{ color: 'white', whiteSpace: 'nowrap', mr: 2 }}
					>
						Autoplay speed
					</Typography>
					<Slider
						size="small"
						value={autoplayLevel}
						onChange={(_, value) =>
							setAutoplayLevel(value as number)
						}
						step={1}
						max={AUTOPLAY_LEVELS.length - 1}
						min={0}
						valueLabelDisplay="auto"
						sx={{ color: 'white' }}
					/>
				</Box>
			)}
		</Box>
	)
}
