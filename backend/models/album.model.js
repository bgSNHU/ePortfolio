const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: { type: String, required: true, unique: true },
    albumArtist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    albumReleaseDate: { type: Date },
    albumGenre: { type: String },
    albumSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    userAdded: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Albums'
});

module.exports = mongoose.model('Album', albumSchema);