import { BotType } from './types'

interface DefaultAttributes {
	id: string
	createdAt: string
	updatedAt: string
}

export interface Bot extends DefaultAttributes {
	endpoint: string
	type: BotType
	userId: string
	name: string
}

export interface Game extends DefaultAttributes {
	positions: string[]
	whiteBotId: string
	blackBotId: string
}

export interface Set extends DefaultAttributes {}

export interface User extends DefaultAttributes {
	email: string
}
