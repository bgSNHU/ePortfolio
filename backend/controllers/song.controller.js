const mongoose = require('mongoose');
const Song = require('../models/song.model');

// CRUD functions for Song //

exports.createSong = async (req, res) => {
    try {
        const songData = { ...req.body };

        // Deletes any empty, optional variables before creating database record //
        if (!songData.songAlbum) delete songData.songAlbum;
        if (!songData.songReleaseDate) delete songData.songReleaseDate;
        if (!songData.userAddedSong) delete songData.userAddedSong;
        if (!songData.songTime) delete songData.userAddedSong;

        const song = await Song.create(songData);
        res.status(201).json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find()
        .populate('songArtist')                 // Generates 'songArtist' from ObjectId
        .populate('songAlbum');                 // Generates 'songAlbum' from ObjectId
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getSongsByAlbum = async (req, res) => {
    try {
        const albumSongs = await Song.find({
            songAlbum: req.params.id,
        })
        .populate('songArtist')
        .populate('songAlbum');
        res.json(albumSongs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getSongsByArtist = async (req, res) => {
    try {
        const artistSongs = await Song.find({
            songArtist: req.params.id,
        })
        .populate('songTitle');                    // Generates 'songTitle' from ObjectId
        res.json(artistSongs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getOneSong = async (req, res) => {
    try {
        const song = await Song.findById({
            _id: req.params.id,
        })
        .populate('songArtist')
        .populate('songAlbum');
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
            $set: req.body                  // Only updates modified fields
        }, {
            new: true                       // Returns updated document
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