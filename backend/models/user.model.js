const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userSongContributions: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        default: []
    },
    userArtistContributions: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
        default: []
    },
    userPlaylistContributions: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
        default: []
    },
    userPlaylists: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
        default: []
    },
    userRole: { type: String, required: true },
 }, {
    collection: 'Users',
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);