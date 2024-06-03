const express = require('express');
const router = express.Router();
const jwtAuthentication = require('../middleware/jwt-authentication');
const User = require('../models/user');
const {modelSchema} = require('../models/public-videos');

router.get('/', jwtAuthentication, async(req,res)=>{

    
    try {
        const userId = req.rootUser._id;

        // Fetch the user's private videos from the database
        const user = await User.findById(userId).select('privateMovies').lean();
        const privateVideos = user.privateMovies || [];

        // Randomly select 8 videos from the user's private videos
        const randomVideos = privateVideos.sort(() => 0.5 - Math.random()).slice(0, 8);

        // Render the 'home' view with the user's random 8 private videos
        res.render('home', { message: null, movies: randomVideos });
    } catch (error) {
        console.error('Error fetching user\'s private videos:', error);
        res.status(500).json({ error: 'An error occurred while fetching user\'s private videos' });
    }


})

router.post('/', jwtAuthentication, async (req, res) => {
    const { Title, Year, imdbID, Type, Poster } = req.body;
    const movie = { Title, Year, imdbID, Type, Poster };

    const userId = req.rootUser._id;

    try {
        const user = await User.findOne({ _id: userId });
        const videos = await modelSchema.find().limit(8).lean(); // Use .lean() to get plain JavaScript objects

        // Check if the movie with the same imdbID already exists
        const existingMovie = user.privateMovies.find(m => m.imdbID === imdbID);
        if (existingMovie) {
            return res.render('home', {message: `Movie is Already present in private list`, movies:videos})
        }

        // If the movie doesn't exist, insert it into privateMovies array
        user.privateMovies.push(movie);
        await user.save();

        res.render('home', {message: `Movie Added to Private List`, movies:videos});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

