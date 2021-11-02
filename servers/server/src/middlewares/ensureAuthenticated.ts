import { NextFunction, Request, Response } from 'express'

export const ensureAuthenticated = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	if (!req.isAuthenticated()) {
		return next(Error('Unauthenticated'))
	}

	next()
}
