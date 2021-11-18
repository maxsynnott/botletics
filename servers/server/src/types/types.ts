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

export type ChessResult =
	| 1 // White win
	| 0 // Black win
	| 0.5 // Draw
	| -1 // Ongoing
