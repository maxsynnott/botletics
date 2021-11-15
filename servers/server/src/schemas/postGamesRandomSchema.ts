import Joi from 'joi'

export const postGamesRandomSchema = Joi.object({
	botId: Joi.string().required(),
})
