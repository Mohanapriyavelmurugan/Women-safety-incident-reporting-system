const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.post('/', caseController.addCaseUpdate);
router.get('/', caseController.getAllCaseUpdates);

module.exports = router;
