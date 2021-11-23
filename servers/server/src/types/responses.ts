import { Bot, User } from '@prisma/client'
import { ValidationErrorItem } from 'joi'
import { BotWithGames, GameWithBots } from './modelsWith'

export type ErrorResponse = {
	status: number
	error: { name: string; message: string }
	validationErrors?: Pick<ValidationErrorItem, 'path' | 'message' | 'type'>[]
}

export type BotIndexResponse = Bot[]
export type BotShowResponse = BotWithGames
export type BotCreateResponse = Bot
export type BotGamesResponse = GameWithBots[]

export type GameShowResponse = GameWithBots

type StatusResponse = 'Healthy' | 'Unhealthy'
export type HealthCheckResponse = {
	status: StatusResponse
	statuses: Record<string, StatusResponse>
}

export type SessionCreateResponse = User
export type SessionDeleteResponse = null

export type UserCreateResponse = User
export type UserCurrentResponse = User | null
