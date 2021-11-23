import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

export const postUsersSchema = Joi.object({
	email: Joi.string().email().required(),
	password: passwordComplexity({
		min: 6,
		max: 30,
		lowerCase: 0,
		upperCase: 0,
		symbol: 0,
	}).required(),
	username: Joi.string().min(3).max(16).required(),
})
