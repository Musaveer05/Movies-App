if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const dbUrl = process.env.DB_URL;
mongoose.set('strictQuery', false);

mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 60000, // 1 minute timeout
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error: "));
db.once('open', ()=>{
    console.log('Database Connected');
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', require('./routers/home'));
app.use('/search-movie', require('./routers/searchBar'));
app.use('/publicVideos', require('./routers/publicVideos'));
app.use('/SignUp', require('./routers/signUp'));
app.use('/SignIn', require('./routers/signIn'));
app.use('/add-get-Private', require('./routers/privateVideos'));

app.post('/signin1', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("Username:", username);
        console.log("Password:", password);

        const foundUser = await User.findOne({ username });

        if (!foundUser || foundUser.password !== password) {
            return res.status(404).json({ message: "Enter Valid Credentials" });
        }

        return res.status(200).json({ message: "User found" });

    } catch (error) {
        console.error("Error in /signin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

module.exports = app;
