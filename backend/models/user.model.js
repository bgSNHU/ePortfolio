const mongoose = require('mongoose');

// Defines database document structure //

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userSongContributions: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],          // Uses ObjecId to reference other Song documents. Reduces database redundancy
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
    timestamps: true            // Used to populate when document was added or updated
});

module.exports = mongoose.model('User', userSchema);