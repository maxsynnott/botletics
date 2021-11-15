import repl from 'repl'

import { db } from './src/clients/db'
import { Chess } from 'chess.js'

const server = repl.start()
server.context.db = db
server.context.Chess = Chess
