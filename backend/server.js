// Imports //
const express = require('express');     // Imports Express module
const mongoose = require('mongoose');   // Imports Mongoose for MongoDB interactions
const cors = require('cors');           // Imports CORS middleware to allow frontend to make requests to backend
const dotenv = require('dotenv');       // Imports dotenv to load environment variables from .env file
const connectDB = require('./config/db');

dotenv.config();
const app = express();      //Instantiates Express
const PORT = process.env.PORT || 3000;

app.use(express.json());    //Parses JSON
app.use(cors());            //Enables CORS for all routes   

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