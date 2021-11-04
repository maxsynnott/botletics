import { Router } from 'express'
import { BotController } from '../controllers/BotController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const botsRouter = Router()

botsRouter.get('/bots', ensureAuthenticated, BotController.index)
botsRouter.post('/bots', ensureAuthenticated, BotController.create)
