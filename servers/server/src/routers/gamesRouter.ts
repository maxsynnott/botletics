import { Router } from 'express'
import { GameController } from '../controllers/GameController'

export const gamesRouter = Router()

gamesRouter.post('/games/:id/start', GameController.start)
