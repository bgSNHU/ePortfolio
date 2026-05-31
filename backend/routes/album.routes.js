const router = require('express').Router();
const { createAlbum, getAlbums, getOneAlbum, updateAlbum, deleteAlbum } = require('../controllers/album.controller');

router.get('/', getAlbums);

router.get('/:id', getOneAlbum);

router.post('/', createAlbum);

router.put('/:id', updateAlbum);

router.delete('/:id', deleteAlbum);

module.exports = router;