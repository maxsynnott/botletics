import snakeCase from 'just-snake-case'

export const displayGameStatus = (
	status: string,
	currentUserColor: string,
): string => {
	// TODO: Replace with more graceful solution
	const result = snakeCase(status.split(':')[0]).split('_')[0]
	if (result === 'draw') return 'draw'
	if (['white', 'black'].includes(result))
		return result === currentUserColor ? 'win' : 'loss'
	return 'other'
}
