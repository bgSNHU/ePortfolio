const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //TODO: Add function to get all albums
});

router.get('/:id', (req, res) => {
    //TODO: Add function to get a single album by id
});

router.get('/:id/songs', (req, res) => {
    //TODO: Add function to get all songs on an album
});

router.post('/', (req, res) => {
    //TODO: Add function to add a new album
});

router.put('/:id', (req, res) => {
    //TODO: Add function to update an album
});

router.delete('/:id', (req, res) => {
    //TODO: Add function to delete an album
});

module.exports = router;