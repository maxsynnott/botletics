import { Request, Response } from 'express'

export class HealthCheckController {
	static healthCheck = (req: Request, res: Response) => {
		res.status(200).json({ status: 'Healthy' })
	}
}
