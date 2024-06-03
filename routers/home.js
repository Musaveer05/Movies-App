const express = require('express')
const router = express.Router();
const {modelSchema} = require('../models/public-videos')

router.get('/', async (req,res)=>{

    const videos = await modelSchema.find().limit(8).lean(); // Use .lean() to get plain JavaScript objects
    res.render('home', { movies: videos , message:null});

    // res.render('home', { message:null, movies: null }); // Pass movies as null initially
})


module.exports = router;