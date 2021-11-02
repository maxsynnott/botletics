import { Router } from 'express'
import { UserController } from '../controllers/UserController'

export const usersRouter = Router()

usersRouter.post('/users', UserController.create)
