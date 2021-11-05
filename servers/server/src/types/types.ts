import { RequestHandler } from 'express'

export type BotType = 'chess'

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export interface Route {
	method: HttpMethod
	path: string
	handlers: RequestHandler[]
	ensureAuthenticated?: boolean
}
