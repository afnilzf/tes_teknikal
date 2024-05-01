const express = require('express');
const router = express.Router()
// const OAuth2Server = require('oauth2-server');

const presenceController = require('../controller/presence')
const oauthMiddleware = require('../middleware/oauthMiddleware');

// Middleware OAuth2-server diterapkan di sini
router.use(oauthMiddleware);

// Get 
router.get('/', presenceController.getAllPresence);
// router.get('/:id', presenceController.getPresenceById);

//Create
router.post('/', presenceController.insertNewPresence);

//Update approval
router.put('/:id', presenceController.updateApproval);


module.exports = router;