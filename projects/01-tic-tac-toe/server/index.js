import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'
import { Console } from 'console'

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
        // notify existing users
        socket.broadcast.emit("user disconnected", {
            playerId: socket.id,
        });
    })

    socket.on('challenge player', ({toPlayer}) => {
        socket.to(toPlayer).emit('receive challenge', {
            fromPlayer: socket.id
        })
    })

    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

})

io.on('connection', (socket) => {
    const players = [];
    for (let [id, socket] of io.of("/").sockets) {
    players.push({
        playerId: id,
    });
    }
    socket.emit("players", players);

    // notify existing users
    socket.broadcast.emit("user connected", {
        playerId: socket.id,
    });
})

server.listen(PORT, () => {
    console.log(`Welcome from port ${PORT}`)
})

