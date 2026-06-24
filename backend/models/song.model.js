const mongoose = require('mongoose');

// Defines database document structure //

const songSchema = new mongoose.Schema({
    songTitle: { type: String, required: true },
    songArtist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },        // Uses ObjecId to reference other Artist documents. Reduces database redundancy
    songReleaseDate: { type: Date },
    songAlbum: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    songTime: { type: String },
    userAddedSong: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Songs',
    timestamps: true                // Used to populate when document was added or updated
});

module.exports = mongoose.model('Song', songSchema);