import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { initApp } from './initializers/initApp'

const app = express()

initApp(app)

const port = process.env.PORT ?? 8080
app.listen(port, () => console.log(`Listening at http://localhost:${port}/`))
