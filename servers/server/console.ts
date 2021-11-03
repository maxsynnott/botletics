import repl from 'repl'

import { db } from './src/clients/db'

const server = repl.start()
server.context.db = db
