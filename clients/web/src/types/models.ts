import { BotStatus, BotType } from './types'

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
	elo: number
	status: BotStatus
}

export interface Game extends DefaultAttributes {
	history: string[]
	whiteBotId: string
	whiteBot?: Bot
	blackBotId: string
	blackBot?: Bot
}

export interface User extends DefaultAttributes {
	email: string
}
