import { ChessInstance } from 'chess.js'

enum ChessResult {
	WHITE_WIN = '1-0',
	BLACK_WIN = '0-1',
	DRAW = '1/2-1/2',
	ONGOING = '*',
}

export const getChessGameResult = (chess: ChessInstance): ChessResult => {
	if (chess.in_draw()) return ChessResult.DRAW

	if (chess.in_checkmate()) {
		return chess.turn() === 'w'
			? ChessResult.BLACK_WIN
			: ChessResult.WHITE_WIN
	}

	return ChessResult.ONGOING
}
