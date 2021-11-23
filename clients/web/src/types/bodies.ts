import { Bot, User } from '@models'

export type PostBotBody = Pick<Bot, 'endpoint' | 'name'>
export type PostUserBody = Pick<User, 'email'> & {
	password: string
	username: string
}
export type PostSessionBody = Pick<User, 'email'> & { password: string }
