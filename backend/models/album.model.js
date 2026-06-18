const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: { type: String, required: true, unique: true },
    albumArtist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    albumReleaseDate: { type: Date },
    albumGenre: {
        type: { type: String },
        //default: ''
    },
    albumSongs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        default: []
    },
    userAdded: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Albums'
});

module.exports = mongoose.model('Album', albumSchema);