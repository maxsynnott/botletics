import { Bot } from '@prisma/client'

export type PostBotBody = Pick<Bot, 'endpoint' | 'name' | 'type'>
