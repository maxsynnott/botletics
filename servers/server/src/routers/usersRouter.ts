import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const usersRouter = Router()

usersRouter.get('/users/current', ensureAuthenticated, UserController.current)
usersRouter.post('/users', UserController.create)
