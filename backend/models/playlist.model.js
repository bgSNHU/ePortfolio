const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    songs: { type: Array, required: true },
    playlistTitle: { type: String, required: true, unique: true },
    playlistCreator:{ type: String, required: true },
    playlistCreationDate: { type: Date, required: true }
}, {
    collection: 'Playlists'
});

module.exports = mongoose.model('Playlist', playlistSchema);