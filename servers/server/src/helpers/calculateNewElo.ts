const MAX_ADJUSTMENT = 32

export const calculateNewElo = (
	elo: number,
	opponentElo: number,
	result: 0 | 0.5 | 1,
): number =>
	Math.round(
		elo +
			MAX_ADJUSTMENT *
				(result - calculateExpectedScore(elo, opponentElo)),
	)

const calculateExpectedScore = (elo: number, opponentElo: number): number =>
	1 / (1 + Math.pow(10, (opponentElo - elo) / 400))
