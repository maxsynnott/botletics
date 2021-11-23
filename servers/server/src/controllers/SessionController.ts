import { Request, Response } from 'express'
import { UnauthenticatedException } from '../exceptions/UnauthenticatedException'
import {
	SessionCreateResponse,
	SessionDeleteResponse,
} from '../types/responses'

export class SessionController {
	static create = (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()

		const { passwordHash, ...otherFields } = req.user
		const response: SessionCreateResponse = otherFields
		res.status(201).json(response)
	}

	static delete = (req: Request, res: Response) => {
		req.logOut()

		const response: SessionDeleteResponse = null
		res.status(204).json(response)
	}
}
