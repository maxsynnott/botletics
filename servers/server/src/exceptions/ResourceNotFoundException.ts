import { HttpException } from './HttpException'

export class ResourceNotFoundException extends HttpException {
	constructor(message = 'Not found') {
		super(message, 404)
		this.name = 'ResourceNotFoundException'
	}
}
