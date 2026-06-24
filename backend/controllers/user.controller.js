const mongoose = require('mongoose');
const User = require('../models/user.model');

// CRUD functions for User //

exports.createUser = async (req, res) => {
    try {
        const userData = { ...req.body };

        // Deletes any empty, optional variables before creating database record //
        if (!userData.userSongContributions) delete userData.userSongContributions;
        if (!userData.userArtistContributions) delete userData.userArtistContributions;
        if (!userData.userPlaylistContributions) delete userData.userPlaylistContributions;
        if (!userData.userPlaylists) delete userData.userPlaylists;

        const user = await User.create(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findById({
            _id: req.params.id,
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body              // Only updates modified fields
        }, {
            new: true                   // Returns updated document
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};