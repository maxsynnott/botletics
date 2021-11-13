import axios from 'axios'
import { Request, Response } from 'express'

export class HealthCheckController {
	static healthCheck = (req: Request, res: Response) => {
		res.status(200).json({ status: 'Healthy' })
	}

	static outgoing = async (req: Request, res: Response) => {
		const response = await axios.get('https://api.trending-github.com/')
		res.status(response.status).json({
			status: response.status + ' ' + response.statusText,
			response,
		})
	}
}
