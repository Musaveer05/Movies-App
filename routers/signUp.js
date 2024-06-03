const express = require('express');
const router = express.Router();
const User = require('../models/user');
const JoiSchema = require('../userDefined/validations');
const bcrypt = require('bcrypt');

let str;
const getCaptcha = function () {
    let arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
    let emptyarr = [];

    for (let i = 0; i < 6; i++) {
        emptyarr.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    str = emptyarr.join("");
    return str;
};

const captchaResult = async (captcha) => {
    return captcha === str;
};

router.get('/', (req, res) => {
    getCaptcha();
    res.render('reg_login/signUp', { captcha: str, message: null });
});

router.post('/', async (req, res) => {
    const { email, password, captcha } = req.body;
    console.log(email, password, captcha);

    try {
        if (!email || !password || !captcha) {
            getCaptcha();
            return res.render('reg_login/signUp', { captcha: str, message: `All fields are required` });
        }

        const emailExists = await User.findOne({ email: email });

        if (emailExists) {
            return res.redirect('/SignIn');
        }

        const validResult = JoiSchema.validate({
            email: email,
            password: password
        });

        const hashPassword = await bcrypt.hash(password, 12);


        if (validResult.error) {
            getCaptcha();
            return res.render('reg_login/signUp', {
                message: validResult.error.details[0].message,
                captcha: str
            });
        }

        const isCaptchaValid = await captchaResult(captcha);
        if (!isCaptchaValid) {
            getCaptcha();
            return res.render('reg_login/signUp', { message: 'Enter Valid Captcha', captcha: str });
        }

        const user = new User({
            email: email,
            password: hashPassword
        })

        await user.save();
        res.redirect('/signIn');

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send(`There's some error at this time. Please try again later.`);
    }
});

module.exports = router;
