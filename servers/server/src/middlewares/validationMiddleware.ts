import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'
import { ValidationException } from '../exceptions/ValidationException'

export const validationMiddleware =
	(schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body, {
			abortEarly: false,
			allowUnknown: false,
		})

		if (error) {
			next(new ValidationException(error))
		} else {
			next()
		}
	}
