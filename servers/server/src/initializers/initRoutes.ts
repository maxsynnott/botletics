import { Express } from 'express'
import { sessionsRouter } from '../routers/sessionsRouter'
import { setsRouter } from '../routers/setsRouter'
import { usersRouter } from '../routers/usersRouter'

const routers = [setsRouter, sessionsRouter, usersRouter]

export const initRoutes = (app: Express) => {
	routers.forEach((router) => app.use(router))
}
