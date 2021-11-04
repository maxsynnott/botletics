import { ChessInstance } from 'chess.js'
import { ChessResult } from '../types/types'

const RESULT_MAP: Record<string, ChessResult> = {
	'*': 'ongoing',
	'1/2-1/2': 'draw',
	'1-0': 'whiteWin',
	'0-1': 'blackWin',
}

export const getChessGameResult = (chess: ChessInstance): ChessResult => {
	const { Result: result } = chess.header()

	if (result && RESULT_MAP[result]) {
		return RESULT_MAP[result]
	}

	return 'ongoing'
}
