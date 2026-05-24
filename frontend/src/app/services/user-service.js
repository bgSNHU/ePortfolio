const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    //TODO: Add profile view functionality
});

router.put('/:id', (req, res) => {
    //TODO: Add profiel update functionality
});

router.delete('/:id', (req, res) => {
    //TODO: Add account deletion functionality
});

router.get('/:id/playlists', (req, res) => {
    //TODO: Add get playlists functionality
})

module.exports = router;