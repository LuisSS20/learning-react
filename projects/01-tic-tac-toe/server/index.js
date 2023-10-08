import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'

dotenv.config()
const PORT = process.env.PORT
const URL_CLIENT = process.env.URL_CLIENT

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: URL_CLIENT
    }
  })

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

io.on('connect', (socket) => {
    console.log('- A user connected')

    socket.on('disconnect', () => {
        console.log('- A user disconnected')
    })
})

server.listen(PORT, () => {
    console.log(`Welcome from port ${PORT}`)
})

