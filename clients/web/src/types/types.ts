export interface Credentials {
	email: string
	password: string
}

export type BotType = 'chess'
export type ChessResult = 'ongoing' | 'draw' | 'whiteWin' | 'blackWin'
