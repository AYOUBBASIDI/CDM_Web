const express = require('express');
const router = express.Router();
const agencesController = require('../../controllers/Admin/agencesController.js');

router.route('/')
    .get(agencesController.getAllAgences)
    .post(agencesController.newAgence);

module.exports = router;