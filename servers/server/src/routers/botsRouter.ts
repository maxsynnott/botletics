import { Router } from 'express'
import { BotController } from '../controllers/BotController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const botsRouter = Router()

botsRouter.get('/bots', ensureAuthenticated, BotController.index)
botsRouter.get('/bots/:id', ensureAuthenticated, BotController.show)

botsRouter.post('/bots', ensureAuthenticated, BotController.create)
