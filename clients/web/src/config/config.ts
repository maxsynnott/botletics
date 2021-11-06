export const config = {
	api: {
		baseUrl: import.meta.env.PROD
			? 'https://api.botletics.live'
			: 'http://localhost:8080',
	},
}
