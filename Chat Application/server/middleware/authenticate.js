const jwt = require('jsonwebtoken')
const UserData = require('../models/userschema')

const Authenticate = async (req,res,next) =>{
    try {
        const token = req.cookies.jwtoken
        const verifytoken = jwt.verify(token,process.env.SECRETKEY)

        const rootUser = await UserData.findOne({_id:verifytoken._id,'tokens.token':token})
        
        if(!rootUser){
            throw new Error("User Not found")
        }
        else{
            req.token = token
            req.rootUser = rootUser
            req.userID = rootUser._id
        }
    } catch (error) {
        res.status(401).send('Unauthorized: No Token Provided')
        console.log(error)
    }

    next();

}

module.exports = Authenticate