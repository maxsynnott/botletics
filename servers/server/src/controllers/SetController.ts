import { Request, Response } from 'express'
import { SetService } from '../services/setService'

export class SetController {
	static index = async (req: Request, res: Response) => {
		const sets = await SetService.getSets()
		res.json(sets)
	}
}
