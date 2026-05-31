const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songTitle: { type: String, required: true },
    songArtist: { type: String, required: true },
    songReleaseDate: { type: Date },
    songAlbum: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    songTime: { type: String },
}, {
    collection: 'Songs'
});

module.exports = mongoose.model('Song', songSchema);