import { NextFunction, Request, Response } from 'express'
import { UnauthenticatedException } from '../exceptions/UnauthenticatedException'

export const ensureAuthenticated = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	if (req.isAuthenticated()) {
		next()
	} else {
		next(new UnauthenticatedException())
	}
}
