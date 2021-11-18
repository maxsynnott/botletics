import { Request, Response } from 'express'
import { UnauthenticatedException } from '../exceptions/UnauthenticatedException'
import { SessionCreateResponse } from '../types/responses'

export class SessionController {
	static create = (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()

		const response: SessionCreateResponse = req.user
		res.status(201).json(response)
	}
}
