const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true }
}, {
    collection: 'Users'
});

module.exports = mongoose.model('User', userSchema);