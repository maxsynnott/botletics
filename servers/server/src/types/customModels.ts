import { Bot } from '.prisma/client'
import { User } from '@prisma/client'
import { ForcefullyOmit } from './types'

export type BotWithoutEndpoint = ForcefullyOmit<Bot, 'endpoint'>
export type UserWithoutPasswordHash = ForcefullyOmit<User, 'passwordHash'>
