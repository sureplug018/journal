const express = require('express');
const authController = require('../controllers/authController');
const editorController = require('../controllers/editorController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.post('/create-editor', editorController.createEditor);

router.patch('/edit-editor/:editorId', editorController.editEditor);

router.delete('/delete-editor/:editorId', editorController.deleteEditor);

module.exports = router;
