const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: { type: String, required: true, unique: true },
    artistBirthday: { type: Date },
    artistSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    artistAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
    userAddedAlbum: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Artists'
});

module.exports = mongoose.model('Artist', artistSchema);