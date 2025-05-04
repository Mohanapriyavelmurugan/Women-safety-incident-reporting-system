const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.addEmergencyContact);
router.get('/:userId', contactController.getUserContacts);

module.exports = router;
