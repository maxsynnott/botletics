import { Request, Response } from 'express'
import { requestHandler } from '../helpers/requestHandler'

export class SessionController {
	static create = requestHandler((req: Request, res: Response) => {
		res.status(201).json(req.user)
	})
}
