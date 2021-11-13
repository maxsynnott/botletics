import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { initApp } from './initializers/initApp'

const app = express()
initApp(app)
