import { Chess } from 'chess.js'
import random from 'just-random'

const defaultResponse = {
	isBase64Encoded: false,
	statusCode: 200,
	statusDescription: '200 OK',
	headers: { 'Content-Type': 'application/json' },
	body: '{}',
}

export const handler = async (event: any) => {
	console.log(event)
	if (event.path.endsWith('/healthcheck')) return defaultResponse
	const body = JSON.parse(event.body)
	const fen = body.payload.fen
	const chess = new Chess(fen)
	const possibleMoves = chess.moves()
	const move = random(possibleMoves)
	if (!move) throw new Error('No possible moves')
	return { ...defaultResponse, body: JSON.stringify({ move }) }
}
