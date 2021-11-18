import { RequestHandler } from 'express'
import { Schema } from 'joi'

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export interface Route {
	method: HttpMethod
	path: string
	handlers: RequestHandler[]
	ensureAuthenticated?: boolean
	validationSchema?: Schema
}
