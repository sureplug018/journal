const express = require('express');
const authController = require('../controllers/authController');
const journalController = require('../controllers/journalController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.post(
  '/upload-journal',
  journalController.uploadFiles,
  journalController.uploadJournal,
);

router.patch(
  '/update-journal/:journalId',
  journalController.uploadFiles,
  journalController.editJournal,
);

module.exports = router;
