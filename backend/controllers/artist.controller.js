const mongoose = require('mongoose');
const Artist = require('../models/artist.model');

// CRUD functions for Artist //

exports.createArtist = async (req, res) => {
    try {
        const artistData = { ...req.body };

        // Deletes any empty, optional variables before creating database record //
        if (!artistData.artistBirthday) delete artistData.artistBirthday;
        if (!artistData.artistSongs) delete artistData.artistSongs;
        if (!artistData.artistAlbums) delete artistData.artistAlbums;
        if (!artistData.userAddedAlbum) delete artistData.userAddedAlbum;

        const artist = await Artist.create(artistData);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getOneArtist = async (req, res) => {
    try {
        const artist = await Artist.findById({
            _id: req.params.id,
        })
        res.json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body          // Only updates modified fields
        }, {
            new: true               // Returns updated document
        });
        res.json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.deleteArtist = async (req, res) => {
    try{
        const artist = await Artist.findByIdAndDelete({
            _id: req.params.id,
        });
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};