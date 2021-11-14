import { HttpException } from './HttpException'

export class ValidationException extends HttpException {
	constructor(message = 'Validation Error') {
		super(message, 422)
		this.name = 'ValidationException'
	}
}
