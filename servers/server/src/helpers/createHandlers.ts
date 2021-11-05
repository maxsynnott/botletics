import { RequestHandler } from 'express'
import { requestHandler } from './requestHandler'
import { ensureAuthenticated as ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticated'

export const createHandlers = (
	handlers: RequestHandler[],
	ensureAuthenticated?: boolean,
): RequestHandler[] => {
	const newHandlers: RequestHandler[] = handlers.slice().map(requestHandler)
	if (ensureAuthenticated) newHandlers.unshift(ensureAuthenticatedMiddleware)
	return newHandlers
}
