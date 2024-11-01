const express = require('express');
const authController = require('../controllers/authController');
const scopeController = require('../controllers/scopeController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.post('/create-scope', scopeController.createScope);

module.exports = router;
