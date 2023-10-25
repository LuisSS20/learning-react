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

function whoGoFirst(playerA, playerB)
{
    if (Math.random() < 0.5) {
        return playerA;
    } else {
        return playerB;
    }
}

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on('connect', (socket) => {
    
    socket.on('disconnect', () => {
        console.log('- A user disconnected')
        // notify existing users
        socket.broadcast.emit("user disconnected", {
            playerId: socket.id,
        });
    })

    socket.on('challenge player', ({toPlayer}) => {
        socket.to(toPlayer).emit('receive challenge', {
            fromUsername: socket.username,
            fromPlayer: socket.id
        })
    })

    socket.on('challenge response', ({toPlayer, toUsername, response}) => {
        socket.to(toPlayer).emit('challenge response', {
            fromPlayer: socket.id,
            fromUsername: socket.username,
            response: response,
        })

        // response == true => send info to start match
        if(response)
        {
            const playerFirstTurn = whoGoFirst(toPlayer, socket.id)

            socket.emit('start match', {
                rivalPlayer: toPlayer,
                rivalUsername: toUsername,
                firstTurn: socket.id === playerFirstTurn ? true : false
            })

            socket.to(toPlayer).emit('start match', {
                rivalPlayer: socket.id,
                rivalUsername: socket.username,
                firstTurn: toPlayer === playerFirstTurn ? true : false
            })
        }
    })

    socket.on('update match', (matchData) => {
        socket.to(matchData.toPlayer).emit('update match', matchData)
    })

    socket.on('user disconnect from match', (rivalPlayer) => {
        socket.to(rivalPlayer).emit('user disconnect from match', {fromPlayer: socket.id, fromUsername: socket.username})
    })

    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

})

io.on('connection', (socket) => {

    const players = [];
    for (let [id, socket] of io.of("/").sockets) {
        players.push({
            username: socket.username,
            playerId: id,
        });
    }
    socket.emit("players", players);

    // notify existing users
    socket.broadcast.emit("user connected", {
        username: socket.username,
        playerId: socket.id,
    });
})

server.listen(PORT, () => {
    console.log(`Welcome from port ${PORT}`)
})

