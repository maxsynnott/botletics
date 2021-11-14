import { RequestHandler } from 'express'
import { Schema } from 'joi'

export type BotType = 'chess'

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export interface Route {
	method: HttpMethod
	path: string
	handlers: RequestHandler[]
	ensureAuthenticated?: boolean
	validationSchema?: Schema
}
