const express = require('express');
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', (req,res)=>{
    res.render('reg_login/signIn', {message:null});
})

router.post('/', async(req,res) =>{

    const {email, password} = req.body;

    try{

        if(!email || !password){
            return res.render('reg_login/signIn', {message: `All Fields are required`});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.render('reg_login/signIn', {message:`User does not Exist, Please register First`});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(validPassword){
            const token = await user.generateAuthToken();
            console.log(token);
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + (30 * 60 * 1000)), // for 30 minutes
                httpOnly: true
            });
            // console.log('You are Logged in');
            res.redirect('/');
        }
        else{
            res.render('reg_login/signIn', {message:'Enter Valid Credentials'});
        }
    }
    catch(error){
        res.send(`There's some Error in Signing, Please try again`);
    }

});

module.exports = router;