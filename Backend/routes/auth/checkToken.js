const express = require('express');
const router = express.Router();
const checkController = require('../../controllers/Auth/checkTokenController.js');

router.post('/', checkController.handleCheck);

module.exports = router;