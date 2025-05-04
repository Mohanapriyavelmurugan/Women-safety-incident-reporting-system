const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

router.post('/', incidentController.reportIncident);
router.get('/', incidentController.getAllIncidents);

module.exports = router;
