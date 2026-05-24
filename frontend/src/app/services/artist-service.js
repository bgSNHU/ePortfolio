const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //TODO: Add logic to get all artists
});

router.get('/:id', (req, res) => {
    //TODO: Add logic to get a single artist
});

router.get('/:id/songs', (req, res) => {
    //TODO: Add logic to get all songs by a single artist
});

router.get('/:id/albums', (req, res) => {
    //TODO: Add logic to get all albums by artist
});

router.post('/', (req, res) => {
    //TODO: Add logic to add an artist
});

router.put('/:id', (req, res) => {
    //TODO: Add logic to update an artist
});

router.delete('/:id', (req, res) => {
    //TODO: Add logic to delete an artist
});

module.exports = router;