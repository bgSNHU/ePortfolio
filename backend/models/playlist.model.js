const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true }],
    playlistTitle: { type: String, required: true, unique: true },
    playlistCreator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    playlistCreationDate: { type: Date }
}, {
    collection: 'Playlists'
});

module.exports = mongoose.model('Playlist', playlistSchema);