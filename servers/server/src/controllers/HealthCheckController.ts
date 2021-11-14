import { Request, Response } from 'express'
import dns from 'dns'

export class HealthCheckController {
	static healthCheck = async (req: Request, res: Response) => {
		const statuses: Record<string, 'Healthy' | 'Unhealthy'> = {}
		try {
			await dns.promises.resolve('google.com')
			statuses.internetConnectivity = 'Healthy'
		} catch (e) {
			statuses.internetConnectivity = 'Unhealthy'
		}

		const status = Object.values(statuses).every(
			(status) => status === 'Healthy',
		)
			? 'Healthy'
			: 'Unhealthy'

		const statusCode = status === 'Healthy' ? 200 : 500

		res.status(statusCode).json({
			status,
			statuses,
		})
	}
}
