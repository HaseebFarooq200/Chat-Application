const mongoose = require('mongoose');

const msgsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    chatroom: {
        type: String,
        required: true,
    },
    mymessage:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }
})


const Message = mongoose.model('Chatmessages', msgsSchema)

module.exports = Message;