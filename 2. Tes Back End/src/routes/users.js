const express = require('express');
const router = express.Router()

const userController = require('../controller/user')

//Get /userss
router.get('/', userController.getAllUsers);
router.get('/userEmail', userController.getUserByEmail);
router.get('/getClient', userController.getClientByClientIdAndSecret);
// router.get('/:id', getWargaById);

//Create
router.post('/', userController.createNewUser);


//Update
router.put('/:id', userController.updateUser);

//Delete
router.delete('/:id', userController.deleteUser);

router.post('/login', userController.loginAndGenerateToken);

module.exports = router;