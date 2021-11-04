import { HttpException } from './HttpException'

export class InvalidBotResponse extends HttpException {
	constructor(message = 'Invalid response') {
		super(message, 502)
		this.name = 'InvalidBotResponse'
	}
}
