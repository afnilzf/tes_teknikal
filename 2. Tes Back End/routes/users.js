const express = require('express');
const router = express.Router()

//Get /users
const getUsers = require('../services/users/get-users')
const postUser = require('../services/users/post-user')

router.get('/', getUsers);
// router.get('/:id', getWargaById);
router.post('/', postUser);



module.exports = router;