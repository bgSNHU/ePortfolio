const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //TODO: Add function to get all songs
    //res.send("Woohoo! It works!!!!")
});

router.get('/:id', (req, res) => {
    //TODO: Add function to get single song by id
});

router.post('/', (req, rea) => {
    //TODO: Add function to add single song
});

router.put('/:id', (req, res) => {
    //TODO: Add function to update song by id
});

router.delete('/:id', (req, res) => {
    //TODO: Add function to delete single song by id
});

module.exports = router;