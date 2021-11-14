import { RequestHandler } from 'express'
import { requestHandler } from './requestHandler'
import { ensureAuthenticated as ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticated'
import { Schema } from 'joi'
import { validationMiddleware } from '../middlewares/validationMiddleware'

export const createHandlers = (
	handlers: RequestHandler[],
	ensureAuthenticated?: boolean,
	validationSchema?: Schema,
): RequestHandler[] => {
	const newHandlers: RequestHandler[] = handlers.slice().map(requestHandler)
	if (ensureAuthenticated) newHandlers.unshift(ensureAuthenticatedMiddleware)
	if (validationSchema)
		newHandlers.unshift(validationMiddleware(validationSchema))
	return newHandlers
}
