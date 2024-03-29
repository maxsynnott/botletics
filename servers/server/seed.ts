import { db } from './src/clients/db'
import { hashPassword } from './src/helpers/hashPassword'

const stockfishBotAttributes = {
	name: 'Stockfish',
	endpoint: 'http://localhost:10001',
}

const userAttributes = [
	{
		username: 'admin',
		email: 'admin@botletics.live',
		passwordHash: hashPassword('123456'),
		bots: {
			create: {
				...stockfishBotAttributes,
				name: 'Fallback Stockfish',
				fallback: true,
			},
		},
	},
	{
		username: 'user1',
		email: 'user1@gmail.com',
		passwordHash: hashPassword('123456'),
		bots: {
			create: { ...stockfishBotAttributes, name: 'user1 Stockfish' },
		},
	},
	{
		username: 'user2',
		email: 'user2@gmail.com',
		passwordHash: hashPassword('123456'),
		bots: {
			create: { ...stockfishBotAttributes, name: 'user2 Stockfish' },
		},
	},
	{
		username: 'user3',
		email: 'user3@gmail.com',
		passwordHash: hashPassword('123456'),
		bots: {
			create: { ...stockfishBotAttributes, name: 'user3 Stockfish' },
		},
	},
]

const seed = async () => {
	await Promise.all(
		userAttributes.map((attributes) =>
			db.user.create({ data: attributes }),
		),
	)
}

seed()
	.then(() => console.log('Successfully seeded'))
	.catch((e) => console.error(e))
