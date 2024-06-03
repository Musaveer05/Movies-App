const User = require('../models/user')
const jwt = require('jsonwebtoken')

const jwtAuthenticate = async(req,res,next) =>{

    try {

        const token = req.cookies.jwtToken;

        // console.log(`token is ${token}`);

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        
        const  rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token})
        
        // console.log(rootUser);

        if(!rootUser) throw new Error('User not Found')
        req.token = token;
        req.rootUser = rootUser; 
        req.userId = rootUser._id;

        next();

    } catch (err) {
        res.redirect('/SignIn');
    }

}

module.exports = jwtAuthenticate;