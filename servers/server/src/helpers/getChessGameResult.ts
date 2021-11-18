import { ChessInstance } from 'chess.js'
import { ChessResult } from '../types/types'

export const getChessGameResult = (chess: ChessInstance): ChessResult => {
	if (chess.in_draw()) return 0.5

	if (chess.in_checkmate()) {
		return chess.turn() === 'w' ? 0 : 1
	}

	return -1
}
