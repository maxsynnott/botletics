import { ValidationError, ValidationErrorItem } from 'joi'
import { HttpException } from './HttpException'

export class ValidationException extends HttpException {
	validationErrorItems: ValidationErrorItem[]

	constructor(validationError: ValidationError) {
		super('Validation Error', 422)
		this.name = 'ValidationException'
		this.validationErrorItems = validationError.details
	}
}
