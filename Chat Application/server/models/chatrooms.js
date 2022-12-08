const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    }
})

const Chatrooms = mongoose.model('Chatrooms', chatSchema)

module.exports = Chatrooms;