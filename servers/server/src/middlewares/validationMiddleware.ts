import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'
import { ValidationException } from '../exceptions/ValidationException'

export const validationMiddleware =
	(schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
		const options = {
			abortEarly: false,
			allowUnknown: false,
		}
		const { error } = schema.validate(req.body, options)
		if (error) {
			const { details } = error
			next(
				new ValidationException(
					details.map(({ message }) => message).join(', '),
				),
			)
		} else {
			next()
		}
	}
