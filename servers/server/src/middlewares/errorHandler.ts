import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/HttpException'
import { ErrorResponse } from '../types/responses'

// * Error handlers need to accept all 4 params otherwise won't work
export const errorHandler = (
	// TODO: This should also accept ordinary errors
	error: HttpException,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	console.error(error)
	const { message, name, validationErrorItems } = error
	const status = error?.status ?? 500

	const response: ErrorResponse = {
		status,
		error: { name, message },
	}

	if (validationErrorItems) {
		response.validationErrors = validationErrorItems.map(
			({ message, path, type }) => ({ message, path, type }),
		)
	}

	res.status(status).json(response)
}
