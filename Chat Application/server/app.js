const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const express =require('express')
const app = express();
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const route = require('./router/route')
const UserData = require('./models/users')

const PORT = process.env.PORT

require('./db/conn.js')
app.use(express.json())
app.use(route)


const io = new Server(server, {cors: {origin: "http://localhost:3000",}});

io.on('connection', (socket)=>{

    socket.on('join', ({username,userroom})=>{
        socket.join(userroom)
        // socket.emit('receive_message',({user:username, text: `Welcome to the ${userroom}`}))
        socket.to(userroom).emit('receive_message',({user:username,text: `${username} has joined the chat`}))

        UserData.updateOne(
            {username : username,chatroom: userroom},
            {$set: { IsOnline : true}},()=>{
            });
    })      

    socket.on('send_message', (message)=>{
        socket.emit('receive_message', message)
        socket.to(message.room).emit('receive_message',message);
    })

    socket.on('left', (msg)=>{
        socket.disconnect(msg.userroom)
        socket.to(msg.userroom).emit('receive_message',({user:msg.username,text: `${msg.username} has left the chat`}))

        UserData.updateOne(
            {username : msg.username,chatroom: msg.userroom},
            {$set: { IsOnline : false}},()=>{
            });
    })
})

server.listen(PORT , ()=>{
    console.log("Server is running on",PORT)
})