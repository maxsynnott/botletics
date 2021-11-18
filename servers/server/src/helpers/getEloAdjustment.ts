const MAX_ADJUSTMENT = 32

export const getEloAdjustment = (
	elo: number,
	opponentElo: number,
	result: 0 | 0.5 | 1,
): number =>
	Math.round(MAX_ADJUSTMENT * (result - getExpectedScore(elo, opponentElo)))

const getExpectedScore = (elo: number, opponentElo: number): number =>
	1 / (1 + Math.pow(10, (opponentElo - elo) / 400))
