import { Piece, Square } from 'chess.js'

export type ChessResult = 'ongoing' | 'draw' | 'whiteWin' | 'blackWin'
export type PositionedPiece = { piece: Piece; square: Square }
export type BotStatus = 'healthy' | 'unhealthy'

export type ForcefullyOmit<T, U extends keyof T> = Omit<T, U> &
	Partial<Record<U, never>>
