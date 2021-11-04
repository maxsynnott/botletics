export interface Credentials {
	email: string
	password: string
}

export interface User {
	id: string
	createdAt: string
	updatedAt: string
	email: string
}

export type BotType = 'chess'

export interface Bot {
	id: string
	createdAt: string
	updatedAt: string
	endpoint: string
	type: BotType
	userId: string
	name: string
}

export type PostBotBody = Pick<Bot, 'endpoint' | 'name' | 'type'>
