const mongoose = require('mongoose');

// Defines database document structure //

const playlistSchema = new mongoose.Schema({
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true }],             // Uses ObjecId to reference other Song documents. Reduces database redundancy
    playlistTitle: { type: String, required: true, unique: true },
    playlistCreator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    playlistCreationDate: { type: Date }
}, {
    collection: 'Playlists',
    timestamps: true            // Used to populate when document was added or updated
});

module.exports = mongoose.model('Playlist', playlistSchema);