const express = require('express');
const authController = require('../controllers/authController');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.post(
  '/submit-article',
  authController.protect,
  authController.restrictTo('user'),
  articleController.uploadFiles,
  articleController.submitArticle,
);

router.get('/find-article', articleController.searchArticle);

router.use(authController.protect, authController.restrictTo('admin'));

router.post(
  '/create-article/:journalId',
  articleController.uploadFiles,
  articleController.createArticle,
);

router.patch(
  '/edit-article/:articleId',
  articleController.uploadFiles,
  articleController.editArticle,
);

router.delete(
  '/delete-article/:articleId/:journalId',
  articleController.deleteArticle,
);

router.delete(
  '/delete-submission/:articleId',
  articleController.deleteSubmission,
);

module.exports = router;
