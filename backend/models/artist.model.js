const mongoose = require('mongoose');

// Defines database document structure //

const artistSchema = new mongoose.Schema({
    artistName: { type: String, required: true, unique: true },
    artistBirthday: { type: Date },
    userAddedArtist: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }       // Uses ObjecId to reference other User documents. Reduces database redundancy
}, {
    collection: 'Artists',
    timestamps: true                // Used to populate when document was added or updated
});

module.exports = mongoose.model('Artist', artistSchema);