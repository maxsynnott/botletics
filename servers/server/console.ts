import repl from 'repl'

import { db } from './src/clients/db'
import { runGameQueue } from './src/queues/runGameQueue'
import { runHealthChecksQueue } from './src/queues/runHealthChecksQueue'
import { scheduleGamesQueue } from './src/queues/scheduleGamesQueue'
import { BotService } from './src/services/BotService'
import { ChessService } from './src/services/ChessService'
import { GameService } from './src/services/GameService'
import { UserService } from './src/services/UserService'

const server = repl.start()
server.context.db = db
server.context.runGameQueue = runGameQueue
server.context.runHealthChecksQueue = runHealthChecksQueue
server.context.scheduleGamesQueue = scheduleGamesQueue
server.context.BotService = BotService
server.context.ChessService = ChessService
server.context.GameService = GameService
server.context.UserService = UserService
