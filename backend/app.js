/* Configures Express server */

const express = require('express');     //Imports Express module

const app = express();      //Instantiates Express

app.use(express.json());    //Parses JSON

app.use('/api/songs', require('../frontend/src/app/services/song-service'));           //routes to routes/songs.js for song functions (view all, add, remove, edit, delete)
app.use('/api/artists', require('../frontend/src/app/services/artist-service'));       //routes to routes/artists.js for artist functions (view all, add, remove, edit, delete)
app.use('/api/albums', require('../frontend/src/app/services/album-service'));         //routes to routes/albums.js for album functions (view all, add, remove, edit, delete)
app.use('/api/users', require('../frontend/src/app/services/user-service'));           //routes to routes/users.js for user functions (view profile, update, delete, view playlists)
app.use('/api/playlists', require('../frontend/src/app/services/playlist-service'));   //routes to routes/playlists.js for playlist functions (view all, add, remove, edit, delete)
app.use('/api/auth', require('../frontend/src/app/services/auth/auth-service'));             //routes to routes/auth.js for auth functions login, register, logout)

module.exports = app;