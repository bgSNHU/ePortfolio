const router = require('express').Router();
const { createSong, getSongs, getOneSong, getSongsByAlbum, updateSong, deleteSong } = require('../controllers/song.controller');

router.get('/', getSongs);

router.get('/album/:id', getSongsByAlbum);

router.get('/:id', getOneSong);

router.post('/', createSong);

router.put('/:id', updateSong);

router.delete('/:id', deleteSong);

module.exports = router;