import express from 'express'

const app = express()

app.get('/', (_req, res) => res.send('Hello World!'))

const port = process.env.PORT ?? 8080

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
