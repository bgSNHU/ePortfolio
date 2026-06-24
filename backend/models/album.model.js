const mongoose = require('mongoose');

// Defines database document structure //

const albumSchema = new mongoose.Schema({
    albumName: { type: String, required: true, unique: true },
    albumArtist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },   // Uses ObjecId to reference other Artist documents. Reduces database redundancy
    albumReleaseDate: { type: Date },
    albumGenre: { type: String },
    albumSongs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        default: []
    },
    userAddedAlbum: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }       // Stores the user who created the album
}, {
    collection: 'Albums',
    timestamps: true            // Used to populate when document was added or updated
});

module.exports = mongoose.model('Album', albumSchema);