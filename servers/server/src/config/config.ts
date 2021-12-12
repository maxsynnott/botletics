import { getRequiredEnvVariable } from '../helpers/getRequiredEnvVariable'

export const config = {
	environment: process.env['ENVIRONMENT'],
	session: {
		secret: getRequiredEnvVariable('SESSION_SECRET'),
	},
	redis: {
		host: getRequiredEnvVariable('REDIS_HOST'),
	},
	cronJobs: {
		scheduleGames: {
			cronString: '*/5 * * * *',
		},
	},
}
