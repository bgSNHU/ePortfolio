const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: { type: String, required: true, unique: true },
    artistBirthday: { type: Date },
    artistSongs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        default: []
    },
    artistAlbums: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
        default: []
    },
    userAddedAlbum: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Artists'
});

module.exports = mongoose.model('Artist', artistSchema);