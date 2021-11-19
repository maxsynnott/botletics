import Joi from 'joi'

export const postSessionsSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
})
