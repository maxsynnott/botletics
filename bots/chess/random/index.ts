import { Chess } from 'chess.js'
import random from 'just-random'

interface Event {
	body: string
}

interface ResponseBody {
	move: string
}

interface Response {
	isBase64Encoded: boolean
	statusCode: number
	statusDescription: string
	headers: {
		'Content-Type': string
	}
	body: string
}

export const handler = async (event: Event): Promise<Response> => {
	console.log(event)
	const fen = JSON.parse(event.body).payload.fen
	const chess = new Chess(fen)
	const possibleMoves = chess.moves()
	const move = random(possibleMoves)
	// TODO: Fix once PR is merged
	// Problem with just-random types. Submitted PR
	if (!move) throw new Error('No moves found')

	return generateResponse({ move })
}

const defaultResponse: Response = {
	isBase64Encoded: false,
	statusCode: 200,
	statusDescription: '200 OK',
	headers: { 'Content-Type': 'application/json' },
	body: '',
}

const generateResponse = (body: ResponseBody) => {
	return { ...defaultResponse, body: JSON.stringify(body) }
}
