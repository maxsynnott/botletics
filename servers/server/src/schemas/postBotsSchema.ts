import Joi from 'joi'

export const postBotsSchema = Joi.object({
	type: Joi.string().valid('chess').required(),
	endpoint: Joi.string()
		.uri({ scheme: ['http', 'https'] })
		.required(),
	name: Joi.string().required(),
})
