import { Router } from 'express'
import { SetController } from '../controllers/SetController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const setsRouter = Router()

setsRouter.get('/sets', ensureAuthenticated, SetController.index)
setsRouter.post('/sets', ensureAuthenticated, SetController.create)
