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

export const handler = async (event: Event): Promise<Response> => {
	console.log({ event })
	const {
		payload: { fen },
	} = event
	const chess = new Chess(fen)
	const possibleMoves = chess.moves()
	const move = random(possibleMoves)
	// TODO: Fix once PR is merged
	// Problem with just-random types. Submitted PR
	if (!move) throw new Error('No moves found')

	return { move }
}
