const express = require('express');
const leadController = require('../controllers/leadController');

const router = express.Router();

router.get('/leads', leadController.getLeads);

router.post('/leads', leadController.postLeads);

module.exports = router;