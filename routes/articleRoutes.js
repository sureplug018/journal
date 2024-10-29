const express = require('express');
const authController = require('../controllers/authController');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.post(
  '/create-article/:journalId',
  articleController.uploadFiles,
  articleController.createArticle,
);

module.exports = router;
