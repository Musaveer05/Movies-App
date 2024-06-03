const mongoose = require('mongoose');

const publicMovieSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Poster: {
        type: String,
        required: true
    }
});

const schema = publicMovieSchema;
const modelSchema = mongoose.model('PublicMovie', publicMovieSchema);

module.exports = {schema, modelSchema};