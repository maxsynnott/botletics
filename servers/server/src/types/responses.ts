import { Bot, Game, User } from '@prisma/client'

export type BotIndexResponse = Bot[]
export type BotShowResponse = Bot & {
	gamesAsWhite: Game[]
	gamesAsBlack: Game[]
}
export type BotCreateResponse = Bot

export type GameShowResponse = Game

type StatusResponse = 'Healthy' | 'Unhealthy'
export type HealthCheckResponse = {
	status: StatusResponse
	statuses: Record<string, 'Healthy' | 'Unhealthy'>
}

export type SessionCreateResponse = User

export type UserCreateResponse = User
export type UserCurrentResponse = User
