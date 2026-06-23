const Album = require('../models/album.model');
const mongoose = require('mongoose');

// CRUD functions for albums //

exports.createAlbum = async (req, res) => {
    try {
        const albumData = { ...req.body };

        // Deletes any empty, optional variables before creating database record //
        if (!albumData.albumReleaseDate) delete albumData.albumReleaseDate;
        if (!albumData.albumGenre) delete albumData.albumGenre;
        if (!albumData.albumSongs) delete albumData.albumSongs;
        if (!albumData.userAdded) delete albumData.userAdded;

        const album = await Album.create(albumData);
        res.status(201).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAlbums = async (req, res) => {
    try {
        const albums = await Album.find()
        .populate('albumArtist')      // Populate's albumArtist value from ObjectId
        .populate('albumSongs');      // Populate's albumSongs value from ObjectId
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Allows all artist's albums to be found and displayed on Artist's profile page //
exports.getAlbumsbyArtist = async (req, res) => {
    try {
        const artistAlbums = await Album.find({
            albumArtist: req.params.id,
        });
        res.json(artistAlbums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOneAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id)
        .populate('albumArtist')
        .populate('albumSongs');
        res.json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body      // Only updates modified fields
        }, {
            new: true           // Returns new document
        });
        res.json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete({
            _id: req.params.id
        });
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};