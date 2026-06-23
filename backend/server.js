// Imports //
const express = require('express');     // Imports Express module
const mongoose = require('mongoose');   // Imports Mongoose for MongoDB interactions
const cors = require('cors');           // Imports CORS middleware to allow frontend to make requests to backend
const dotenv = require('dotenv');       // Imports dotenv to load environment variables from .env file
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

dotenv.config();
const app = express();      //Instantiates Express
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'Too many requests, please try again later.'
});

app.use(express.json());    //Parses JSON
app.use(limiter);
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes //
const albumRoutes = require('./routes/album.routes');
const artistRoutes = require('./routes/artist.routes');
const playlistRoutes = require('./routes/playlist.routes');
const songRoutes = require('./routes/song.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);

// Route to check if server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Connect to database and start server
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});