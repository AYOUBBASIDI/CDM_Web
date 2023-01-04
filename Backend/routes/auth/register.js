const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/Auth/registerController');

router.post('/', registerController.handleNewUser);

module.exports = router;