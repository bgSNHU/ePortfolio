const router = require('express').Router();
const { createUser, getUsers, getOneUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.get('/', getUsers);

router.get('/:id', getOneUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;