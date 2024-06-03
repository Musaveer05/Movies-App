const express = require('express');
const router = express.Router();
const {modelSchema} = require('../models/public-videos')

router.get('/', async(req,res)=>{

    try {
        
        const videos = await modelSchema.aggregate([{ $sample: { size: 8 } }]).exec();
        res.render('home', { movies: videos, message: null });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching public videos' });
    }

});

module.exports = router;