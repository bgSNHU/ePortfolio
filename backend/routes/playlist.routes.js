const router = require('express').Router();
const { createPlaylist, getPlaylists, getOnePlaylist, updatePlaylist, deletePlaylist } = require('../controllers/playlist.controller');

router.post('/', createPlaylist);

router.get('/', getPlaylists);

router.get('/:id', getOnePlaylist);

router.put('/:id', updatePlaylist);

router.delete('/:id', deletePlaylist);

module.exports = router;