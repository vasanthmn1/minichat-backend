const express = require('express')
const cors = require('cors')
const colors = require('colors')
const socketio = require("socket.io");
const http = require("http");
const DB = require('./config/ConntingDB');
// const { addUser } = require('./controller/userCtrl');
const { addUser, removeUser, getUser, getRoomUsers } = require('./entity.js');
const dotenv = require('dotenv').config()
const app = express()




const server = http.createServer(app);
const io = socketio(server, { cors: "*" })
DB()
app.use(cors())
app.use(cors(
    {
        origin: "*",
    }
))

app.get('/', (req, res) => {
    res.json("chat  Api");
    console.log("Hello");
})

io.on('connect', (socket) => {


    socket.on('join', ({ user, room }, callback) => {

        const { response, error } = addUser({ id: socket.id, user: user, room: room })
        console.log(response, "res");
        if (error) {
            callback(error)
            return;
        }
        socket.join(response.room);
        socket.emit('message', { user: 'admin', text: `Welcome ${response.user} ` });
        socket.broadcast.to(response.room).emit('message', { user: 'admin', text: `${response.user} has joined` })

        io.to(response.room).emit('roomMembers', getRoomUsers(response.room))
    })

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.user, text: message })

        callback()
    })


    socket.on("disconnect", () => {
        console.log("disconnet")
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.user} has left` })
        }
    })
})

server.listen(8000, () => console.log('Server started on 8000'))
// app.listen(8000, () => console.log('Server started on 8000'))
