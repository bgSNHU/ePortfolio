const mongoose = require('mongoose');
const Playlist = require('../models/playlist.model');

// CRUD functions for Playlist //

exports.createPlaylist = async (req, res) => {
    try {
        const playlistData = { ...req.body };

        // Deletes any empty, optional variables before creating database record //
        if (!playlistData.playlistCreationDate) delete playlistData.playlistCreationDate;

        const playlist = await Playlist.create(playlistData);
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find()
        .populate('songs')                      // Generates 'songs' variable from ObjectIds
        .populate('playlistCreator');           // Generates 'playlistCreator' variable from ObjectIds
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getOnePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById({
            _id: req.params.id,
        })
        .populate('songs')
        .populate('playlistCreator');;
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.updatePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body          // Only updates modified fields
        }, {
            new: true               // Returns updated document
        });
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndDelete({
            _id: req.params.id,
        });
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};