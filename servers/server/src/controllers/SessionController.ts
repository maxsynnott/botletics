import { Request, Response } from 'express'

export class SessionController {
	static create = async (req: Request, res: Response) => {
		res.status(201).json(req.user)
	}
}
