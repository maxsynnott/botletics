import Joi from 'joi'

export const postSetsSchema = Joi.object({
	botIds: Joi.array().length(2).items(Joi.string()).required(),
})
