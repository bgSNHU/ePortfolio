const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: { type: String, required: true, unique: true },
    albumArtist: { type: String, required: true },
    albumReleaseDate: { type: Date },
    albumGenre: { type: String },
}, {
    collection: 'Albums'
});

module.exports = mongoose.model('Album', albumSchema);