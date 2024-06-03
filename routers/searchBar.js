const express = require('express');
const router = express.Router();
const {modelSchema} = require('../models/public-videos')

const OMDB_API_KEY = process.env.OMDB_API_KEY;

router.get('/', async(req,res)=>{

    const {searchQuery} = req.query;

    const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${OMDB_API_KEY}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
            const moviesToRender = [];

            for (let movie of data.Search) {
                const existingMovie = await modelSchema.findOne({ imdbID: movie.imdbID });
                if (!existingMovie) {

                    const newMovie = new modelSchema({
                        Title: movie.Title,
                        Year: movie.Year,
                        imdbID: movie.imdbID,
                        Type: movie.Type,
                        Poster: movie.Poster
                    });

                    await newMovie.save();
                }
                moviesToRender.push(movie);
            }
            const limitedMovies = moviesToRender.slice(0, 8);
            res.render('home', {movies: limitedMovies, message:null });  
        } else {
            res.json("The movie you searched didn't exist, try again.");
        }

    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'An error occurred while fetching movies' });
    }

})

module.exports = router;