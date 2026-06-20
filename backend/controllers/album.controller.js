const Album = require('../models/album.model');
const mongoose = require('mongoose');

exports.createAlbum = async (req, res) => {
    try {
        console.log('Request body: ', req.body);
        const albumData = { ...req.body };

        if (!albumData.albumReleaseDate) delete albumData.albumReleaseDate;
        if (!albumData.albumGenre) delete albumData.albumGenre;
        if (!albumData.albumSongs) delete albumData.albumSongs;
        if (!albumData.userAdded) delete albumData.userAdded;

        console.log('Final albumData before create: ', albumData);

        const album = await Album.create(albumData);
        console.log('Created album: ', album);
        res.status(201).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAlbums = async (req, res) => {
    try {
        const albums = await Album.find()
        .populate('albumArtist')
        .populate('albumSongs');
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAlbumsbyArtist = async (req, res) => {
    try {
        const artistAlbums = await Album.find({
            albumArtist: req.params.id,
        });
        console.log('AlbumsByArtist successful: ', artistAlbums);
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
            $set: req.body
        }, {
            new: true
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