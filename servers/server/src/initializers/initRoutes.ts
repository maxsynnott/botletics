import { Express } from 'express'
import { setRouter } from '../routers/setRouter'

const routers = [setRouter]

export const initRoutes = (app: Express) => {
	routers.forEach((router) => app.use(router))
}
