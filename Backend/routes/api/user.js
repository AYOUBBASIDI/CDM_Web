const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Client/userController.js');

router.route('/:id')
    .get(userController.getData);

router.route('/update/:id')
    .post(userController.updateData);

router.route('/updatePassword/:id')
    .post(userController.updatePassword);

router.route('/disable/:identifiant')
    .post(userController.disableAccount);

router.route('/enable/:identifiant')
    .post(userController.enableAccount);
    

module.exports = router;