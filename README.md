Welcome to the Movie App! This web application allows users to search for their favorite movies, explore a curated list of public movies, and manage their own private collection.

Features :- 

1) Movie Search: Users can easily search for movies by title using the OMDB API, allowing them to find detailed information about their favorite films.

2) Public Movie List: Explore a diverse collection of public movies curated for all users to enjoy. Each movie includes key details such as title, release year, and poster image.

3) Private Movie Collection: Registered users can create and manage their own private movie collection. These movies are only visible to the user who added them, ensuring privacy and customization.

4) JWT Authentication: Secure user authentication is implemented using JSON Web Tokens (JWT). This ensures that users can securely access their private collections while maintaining their privacy.

Technologies Used

## Frontend
- HTML
- CSS
- JavaScript
- EJS (Embedded JavaScript)
- Bootstrap

## Backend
- Node.js
- Express.js

## Database
- MongoDB (with Mongoose ODM)

## Authentication
- JSON Web Tokens (JWT)

## External API
- Open Movie Database (OMDB)

Getting Started
To run the Movie App locally:

Clone this repository.

1) Install dependencies using `npm install`.

2) Create a `.env` file and configure your environment variables, including `DB_URL` for MongoDB connection, `OMDB_API_KEY` for accessing the OMDB API, and `JWT_SECRET` key.

3) Start the server using `npm start`.

4) Open your browser and navigate to `http://localhost:3000` to access the Movie App.
