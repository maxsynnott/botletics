import Joi from 'joi'

export const postBotsSchema = Joi.object({
	endpoint: Joi.string()
		.uri({ scheme: ['http', 'https'] })
		.required(),
	name: Joi.string().required(),
})
