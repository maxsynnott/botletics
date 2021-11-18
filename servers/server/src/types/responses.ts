import { Bot, Game, User } from '@prisma/client'
import { BotWithGames, GameWithBots } from './modelsWith'

export type BotIndexResponse = Bot[]
export type BotShowResponse = BotWithGames
export type BotCreateResponse = Bot
export type BotGamesResponse = GameWithBots[]

export type GameShowResponse = Game

type StatusResponse = 'Healthy' | 'Unhealthy'
export type HealthCheckResponse = {
	status: StatusResponse
	statuses: Record<string, StatusResponse>
}

export type SessionCreateResponse = User
export type SessionDeleteResponse = null

export type UserCreateResponse = User
export type UserCurrentResponse = User | null
