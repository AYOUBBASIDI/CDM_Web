const express = require('express');
const router = express.Router();
const rechargeController = require('../../controllers/Client/rechargeController.js');

router.route('/')
    .post(rechargeController.handleRecharge);

module.exports = router;