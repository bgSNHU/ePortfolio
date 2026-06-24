// Imports //
const express = require('express');     // Imports Express module
const mongoose = require('mongoose');   // Imports Mongoose for MongoDB interactions
const cors = require('cors');           // Imports CORS middleware to allow frontend to make requests to backend
const dotenv = require('dotenv');       // Imports dotenv to load environment variables from .env file
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');    // Imports Express rate limiter to defend against attacks using repeated requests
const helmet = require('helmet');               // Imports Helmet to use secure HTTP headers

dotenv.config();            // Processes dotenv file for use (safeguarding credentials & secrets)
const app = express();      // Instantiates Express
const PORT = process.env.PORT || 3000;

// Sets max allowed attempts within time limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});

app.use(express.json());    // Parses JSON
app.use(limiter);           // Uses rate limits set above
app.use(helmet());          // Uses secure HTTP headers
app.use(cors({              // Only allows requests from frontend, reducing capability for CORS attacks
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