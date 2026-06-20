const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songTitle: { type: String, required: true },
    songArtist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    songReleaseDate: { type: Date },
    songAlbum: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    songTime: { type: String },
    userAddedSong: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Songs',
    timestamps: true
});

module.exports = mongoose.model('Song', songSchema);