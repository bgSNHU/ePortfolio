const Album = require('../models/album.model');
const mongoose = require('mongoose');

exports.createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body);
        res.status(201).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOneAlbum = async (req, res) => {
    try {
        const album = await Album.findById({
            _id: req.params.id,
        });
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