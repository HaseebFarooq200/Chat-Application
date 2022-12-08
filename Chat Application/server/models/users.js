const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    chatroom:{
        type: String,
        required: true
    },
    IsOnline:{
        type: Boolean,
        required: true
    }
})

// Generatting an authentication token

userSchema.methods.generateAuthToken = async function () {
    try {
        let mytoken = jwt.sign({ _id: this._id }, process.env.SECRETKEY)
        this.tokens = this.tokens.concat({ token: mytoken })
        await this.save()
        return mytoken;
    } catch (error) {
        console.log(error)
    }
}

const Users = mongoose.model('Users', userSchema)

module.exports = Users;