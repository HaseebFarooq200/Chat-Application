const express = require('express')
const cookieParser = require("cookie-parser");
const router = express.Router()
const UserData = require('../models/users')
const Chatroom = require('../models/chatrooms')
const Messages = require('../models/messages')
router.use(cookieParser())

router.post('/join', async (req, res) => {
    const { username, room } = req.body;
    try {
        if (!username || !room) {
            res.status(400).json({ error: 'Incomplete Entries' })
        }

        const RoomExist = await Chatroom.findOne({ room })
        if (!RoomExist) {
            res.status(400).json({ error: 'Invalid Entry' })
        }
        else {
        const UserExist = await UserData.findOne({ username })
            if(UserExist){
                res.status(200).json({ message: 'Signed In' })
            }
            else{
                const user = new UserData({ username,chatroom:room,IsOnline:true})
                await user.save()
                
                res.status(200).json({ message: 'Signed In' })
            }
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/create', async (req, res) => {
    const { username, room } = req.body;
    try {
        if (!username || !room) {
            res.status(400).json({ error: 'Incomplete Entries' })
        }
        
        const RoomExist = await Chatroom.findOne({ room })
        if (RoomExist) {
            res.status(400).json({ error: 'Room already Exist' })
        }
        else {
            const user = new UserData({ username,chatroom:room,IsOnline:true})
            const roomname = new Chatroom({ room})
            await user.save()
            await roomname.save()
            res.status(200).json({ message: 'Joined Successfully' })
        }
    } catch (error) {
        console.log("Error : ",error)
    }
})

router.post('/sendmessage',async (req,res)=>{
    const {usermessage,username,userroom} =req.body
    try {
        if (!usermessage) {
            res.status(400).json({ error: 'NULL' })
        }
        else{
            const msg = new Messages({
                mymessage:usermessage,
                username:username,
                chatroom:userroom,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            })
            await msg.save()
            res.status(200).json({ message: 'Message Saved Successfully' })
        }
    } catch (error) {
        console.log("Send message Error : ",error)
    }
})

router.get('/join', async (req, res) => {
    try {
        const users = await UserData.find({ "IsOnline": true })
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/showmessages', async (req, res) => {
    try {
        const users = await Messages.find()
        res.status(200).json(users)
        console.log(users)
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router


  