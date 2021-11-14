import Joi from 'joi'

export const postSessionsSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
		.required(),
})
