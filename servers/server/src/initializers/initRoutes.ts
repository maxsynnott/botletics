import { Express } from 'express'
import { botsRouter } from '../routers/botsRouter'
import { gamesRouter } from '../routers/gamesRouter'
import { sessionsRouter } from '../routers/sessionsRouter'
import { setsRouter } from '../routers/setsRouter'
import { usersRouter } from '../routers/usersRouter'

const routers = [
	setsRouter,
	sessionsRouter,
	usersRouter,
	botsRouter,
	gamesRouter,
]

export const initRoutes = (app: Express) => {
	routers.forEach((router) => app.use(router))
}
