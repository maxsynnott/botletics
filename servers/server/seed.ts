import { db } from './src/clients/db'
import { hashPassword } from './src/helpers/hashPassword'

const stockfishBotAttributes = (elo: number) => ({
	name: 'Stockfish ' + elo,
	endpoint: 'http://localhost:10001/' + elo,
	type: 'chess',
})

const userAttributes = [
	{
		email: 'user1@gmail.com',
		passwordHash: hashPassword('123456'),
		bots: { create: stockfishBotAttributes(2000) },
	},
	{
		email: 'user2@gmail.com',
		passwordHash: hashPassword('123456'),
		bots: { create: stockfishBotAttributes(2000) },
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
