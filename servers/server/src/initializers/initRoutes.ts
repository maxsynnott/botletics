import { Express } from 'express'
import { botsRouter } from '../routers/botsRouter'
import { gamesRouter } from '../routers/gamesRouter'
import { healthCheckRouter } from '../routers/healthCheckRouter'
import { sessionsRouter } from '../routers/sessionsRouter'
import { usersRouter } from '../routers/usersRouter'

const routers = [
	sessionsRouter,
	usersRouter,
	botsRouter,
	healthCheckRouter,
	gamesRouter,
]

export const initRoutes = (app: Express) => {
	routers.forEach((router) => app.use(router))
}
