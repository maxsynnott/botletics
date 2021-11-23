import { Piece, Square } from 'chess.js'

export type ChessResult = 'ongoing' | 'draw' | 'whiteWin' | 'blackWin'
export type PositionedPiece = { piece: Piece; square: Square }
export type BotStatus = 'healthy' | 'unhealthy'
