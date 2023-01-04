const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/Admin/adminController.js');

router.route('/allTransactions')
    .get(adminController.getAllTransactions);

router.route('/allUsers')
    .get(adminController.getAllUsers);

module.exports = router;