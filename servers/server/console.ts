import repl from 'repl'

import { db } from './src/clients/db'
import { Chess } from 'chess.js'
import { runGameQueue } from './src/queues/runGameQueue'
import { runHealthChecksQueue } from './src/queues/runHealthChecksQueue'

const server = repl.start()
server.context.db = db
server.context.Chess = Chess
server.context.queues = { runGameQueue, runHealthChecksQueue }
