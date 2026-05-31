const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: { type: String, required: true, unique: true }
}, {
    collection: 'Artists'
});

module.exports = mongoose.model('Artist', artistSchema)