import express, { Request, Response } from 'express'
import { Chess } from 'chess.js'
import random from 'just-random'

const app = express()

app.use(express.json())

app.post('/', (req: Request, res: Response) => {
	const {
		payload: { fen },
	} = req.body
	const chess = new Chess(fen)
	const move = random(chess.moves())
	res.json({ move })
})

const port = process.env['PORT'] ?? 10000

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
