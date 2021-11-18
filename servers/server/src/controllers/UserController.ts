import { Request, Response } from 'express'
import { UnauthenticatedException } from '../exceptions/UnauthenticatedException'
import { UserService } from '../services/UserService'
import { UserCreateResponse, UserCurrentResponse } from '../types/responses'

export class UserController {
	static create = async (req: Request, res: Response) => {
		const { email, password } = req.body

		const user = await UserService.create(email, password)

		const response: UserCreateResponse = user
		res.status(201).json(response)
	}

	static current = async (req: Request, res: Response) => {
		if (!req.user) throw new UnauthenticatedException()

		const response: UserCurrentResponse = req.user
		res.status(200).json(response)
	}
}
