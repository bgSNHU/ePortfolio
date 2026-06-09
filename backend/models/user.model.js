const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userSongContributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    userArtistContributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
    userPlaylistContributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
    userPlaylists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
    userRole: { type: String, required: true },
    userPassword: { type: String, required: true }
}, {
    collection: 'Users'
});

module.exports = mongoose.model('User', userSchema);