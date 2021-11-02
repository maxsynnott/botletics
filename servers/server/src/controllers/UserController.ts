import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
	static create = async (req: Request, res: Response) => {
		const { email, password } = req.body

		const user = await UserService.create(email, password)
		res.json(user)
	}
}
