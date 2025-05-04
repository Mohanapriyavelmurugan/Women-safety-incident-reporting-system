const express = require('express');
const router = express.Router();
const policeController = require('../controllers/policeController');

router.post('/', policeController.addPolice);
router.get('/', policeController.getPolice);

module.exports = router;
