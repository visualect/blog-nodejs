const express = require('express');
const router = express.Router();
const { getContacts } = require('../controllers/contact-controller.js')

router.get('/contacts', getContacts);

module.exports = router