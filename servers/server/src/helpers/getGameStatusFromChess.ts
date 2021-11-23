import { ChessInstance } from 'chess.js'
import { GameStatus } from '../types/types'

export const getGameStatusFromChess = (chess: ChessInstance): GameStatus => {
	if (chess.in_stalemate()) return 'draw:stalemate'
	if (chess.in_threefold_repetition()) return 'draw:threefoldRepetition'
	if (chess.insufficient_material()) return 'draw:insufficientMaterial'
	if (chess.in_checkmate())
		return chess.turn() === 'w'
			? 'blackWin:checkmate'
			: 'whiteWin:checkmate'

	throw new Error('Chess game not finished or in unknown state')
}
