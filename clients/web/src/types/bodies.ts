import { Bot } from './models'

export type PostBotBody = Pick<Bot, 'endpoint' | 'name' | 'type'>
