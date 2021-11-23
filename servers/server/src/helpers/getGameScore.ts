import { GameScore, GameStatus } from '../types/types'

export const getGameScore = (status: GameStatus): GameScore => {
	const [result] = status.split(':')
	switch (result) {
		case 'white':
			return 1
		case 'black':
			return -1
		case 'draw':
			return 0.5
		case 'error':
			throw new Error('Game is in error state')
		default:
			return -1
	}
}
