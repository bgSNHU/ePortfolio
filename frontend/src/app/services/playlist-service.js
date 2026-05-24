const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    //TODO: Add get single playlist function
});

router.get('/', (req, res) => {
    //TODO: Add function to get all playlists
});

router.put('/:id', (req, res) => {
    //TODO: Add function to update single playlist by id
});

router.delete('/:id', (req, res) => {
    //TODO: Add function to delete single playlist by id
});

router.post('/', (req, res) => {
    //TODO: Add function to add new playlist
});

router.post('/:id/songs', (req, res) => {
    //TODO: Add function to add song to playlist
});

router.delete('/:id/songs/:songId', (req, res) => {
    //TODO: Add function to delete a song from playlist
});

module.exports = router;