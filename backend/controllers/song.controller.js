const mongoose = require('mongoose');
const Song = require('../models/song.model');

exports.createSong = async (req, res) => {
    try {
        const song = await Song.create(req.body);
        res.status(201).json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getSongsByAlbum = async (req, res) => {
    try {
        const albumSongs = await Song.find({
            songAlbum: req.params.id,
        });
        res.json(albumSongs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getOneSong = async (req, res) => {
    try {
        const song = await Song.findById({
            _id: req.params.id,
        });
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.updateSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new: true
        });
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete({
            _id: req.params.id,
        });
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};