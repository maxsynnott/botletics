const getRequiredEnvVariable = (name: string): string => {
	const value = process.env[name]
	if (value === undefined) {
		throw new Error('Missing required env variable: ' + name)
	}
	return value
}

export const config = {
	nodeEnv: process.env['NODE_ENV'],
	session: {
		secret: getRequiredEnvVariable('SESSION_SECRET'),
	},
}
