const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Client/userController.js');

router.route('/:id')
    .get(userController.getActivites);

module.exports = router;