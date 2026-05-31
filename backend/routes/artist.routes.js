const router = require('express').Router();
const { getArtists, getOneArtist, createArtist, updateArtist, deleteArtist } = require('../controllers/artist.controller');

router.get('/', getArtists);

router.get('/:id', getOneArtist);

router.post('/', createArtist);

router.put('/:id', updateArtist);

router.delete('/:id', deleteArtist);

module.exports = router;