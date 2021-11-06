const getRequiredEnvVariable = (name: string): string => {
	const value = process.env[name]
	if (value === undefined) {
		throw new Error('Missing required env variable: ' + name)
	}
	return value
}

export const config = {
	environment: process.env['ENVIRONMENT'],
	session: {
		secret: getRequiredEnvVariable('SESSION_SECRET'),
	},
}
