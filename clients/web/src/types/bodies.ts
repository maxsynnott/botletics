import { Bot, User } from '../types/models'

export type PostBotBody = Pick<Bot, 'name'> & { endpoint: string }
export type PostUserBody = Pick<User, 'email' | 'username'> & {
	password: string
}
export type PostSessionBody = Pick<User, 'email'> & { password: string }
