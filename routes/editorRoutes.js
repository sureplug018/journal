const express = require('express');
const authController = require('../controllers/authController');
const editorController = require('../controllers/editorController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.post('/create-editor', editorController.createEditor);

module.exports = router;
