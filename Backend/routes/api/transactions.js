const express = require('express');
const router = express.Router();
const transferController = require('../../controllers/Client/transferController.js');

router.route('/')
    .post(transferController.handleTransfer);

module.exports = router;