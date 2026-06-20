const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: { type: String, required: true, unique: true },
    artistBirthday: { type: Date },
    userAddedArtist: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'Artists',
    timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);