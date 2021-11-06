import { Request, Response } from 'express'

export class PingController {
	static ping = async (req: Request, res: Response) => {
		res.json('PONG')
	}
}
