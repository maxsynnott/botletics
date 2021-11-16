import { Piece, Square } from 'chess.js'
import { PositionedPiece } from '../types/types'

export const boardToPositionedPieces = (board: (Piece | null)[][]) => {
	const positionedPieces: PositionedPiece[] = []

	for (let y = 0; y < 8; y++) {
		const row = board[y]
		for (let x = 0; x < 8; x++) {
			const piece = row[x]
			if (piece) {
				positionedPieces.push({
					piece,
					square: `${String.fromCharCode(97 + x)}${8 - y}` as Square,
				})
			}
		}
	}

	return positionedPieces
}
