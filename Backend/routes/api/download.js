const express = require('express');
const router = express.Router();
const releveBancaireController = require('../../controllers/Client/releveBancaireController.js');

router.route('/:id')
    .get(releveBancaireController.downloadRB);

module.exports = router;