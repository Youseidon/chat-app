const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicDirectory = path.join(__dirname, "../public")

app.use(express.json())
app.use(express.static(publicDirectory))

io.on('connection', (socket) => {
    console.log('New Websocket Connection');
    socket.emit('message', "Welcome");

    socket.broadcast.emit('message', 'a new user has joined!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    })

    socket.on('disconnect', () => {
        io.emit('message', 'a user has left')
    })
})

server.listen(port, () => {
    console.log("the server is up and running on port", port);
})