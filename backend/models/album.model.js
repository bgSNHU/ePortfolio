const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: { type: String, required: true, unique: true },
    albumArtist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    albumReleaseDate: { type: Date },
    albumGenre: { type: String },
    albumSongs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        default: []
    },
    userAddedAlbum: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Albums',
    timestamps: true
});

module.exports = mongoose.model('Album', albumSchema);