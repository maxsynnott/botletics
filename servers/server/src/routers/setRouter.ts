import { Router } from 'express'
import { SetController } from '../controllers/SetController'

export const setRouter = Router()

setRouter.get('/sets', SetController.index)
