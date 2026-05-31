const mongoose = require('mongoose');
const Playlist = require('../models/playlist.model');

exports.createPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.create(req.body);
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getOnePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById({
            _id: req.params.id,
        });
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
            $set: req.body
        }, {
            new: true
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