import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { UserCreateResponse, UserCurrentResponse } from '../types/responses'
import omit from 'just-omit'

export class UserController {
	static create = async (req: Request, res: Response) => {
		const { email, password, username } = req.body

		const user = await UserService.create({ email, password, username })
		req.logIn(user, (error) => {
			if (error) throw error
		})

		const response: UserCreateResponse = omit(user, ['passwordHash'])
		res.status(201).json(response)
	}

	static current = async (req: Request, res: Response) => {
		let response: UserCurrentResponse = req.user
			? omit(req.user, ['passwordHash'])
			: null
		res.status(200).json(response)
	}
}
