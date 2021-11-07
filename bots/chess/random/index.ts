import { Chess } from 'chess.js'
import random from 'just-random'

interface Event {
	payload: {
		fen: string
	}
}

interface Response {
	move: string
}

export const handler = async ({
	payload: { fen },
}: Event): Promise<Response> => {
	const chess = new Chess(fen)
	const possibleMoves = chess.moves()
	// TODO: Fix once PR is merged
	// Problem with just-random types. Submitted PR
	const move = random(possibleMoves) as unknown as string
	return { move }
}
