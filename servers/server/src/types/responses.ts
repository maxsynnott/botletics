import { Bot, Game, User } from '@prisma/client'
import { ValidationErrorItem } from 'joi'
import { ForcefullyOmit } from './types'

type BotWithoutEndpoint = ForcefullyOmit<Bot, 'endpoint'>
type UserWithoutPasswordHash = ForcefullyOmit<User, 'passwordHash'>

export type ErrorResponse = {
	status: number
	error: { name: string; message: string }
	validationErrors?: Pick<ValidationErrorItem, 'path' | 'message' | 'type'>[]
}

export type BotIndexResponse = BotWithoutEndpoint[]
export type BotShowResponse = BotWithoutEndpoint & {
	gamesAsWhite: Game[]
	gamesAsBlack: Game[]
}
export type BotCreateResponse = BotWithoutEndpoint
export type BotGamesResponse = (Game & {
	whiteBot: BotWithoutEndpoint
	blackBot: BotWithoutEndpoint
})[]
export type BotLeaderboardResponse = BotWithoutEndpoint[]

export type GameShowResponse = Game & {
	whiteBot: BotWithoutEndpoint
	blackBot: BotWithoutEndpoint
}
export type GameRandomResponse = Game & {
	whiteBot: BotWithoutEndpoint
	blackBot: BotWithoutEndpoint
}

type StatusResponse = 'Healthy' | 'Unhealthy'
export type HealthCheckResponse = {
	status: StatusResponse
	statuses: Record<string, StatusResponse>
}

export type SessionCreateResponse = UserWithoutPasswordHash
export type SessionDeleteResponse = null

export type UserCreateResponse = UserWithoutPasswordHash
export type UserCurrentResponse = UserWithoutPasswordHash | null
