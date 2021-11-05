import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/HttpException'

// Error handlers need to accept all 4 params otherwise won't work
export const errorHandler = (
	error: HttpException,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const { message, name } = error
	// TODO: Implemnent correctly typed method of handling this
	// Just in case an ordinary Error slips through
	const status = error?.status ?? 500

	res.status(status).json({ status, error: { name, message } })
}
