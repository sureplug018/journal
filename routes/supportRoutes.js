const express = require('express');
const authController = require('./../controllers/authController');
const supportController = require('./../controllers/supportController');

const router = express.Router();

router
  .route('/send-support')
  .post(authController.protect, supportController.createSupport);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'super-admin'),
    supportController.getAllSupports,
  );

router
  .route('/reply-support/:supportId')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'super-admin'),
    supportController.replySupport,
  );

router
  .route('/send-mail/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'super-admin'),
    supportController.sendMail,
  );

module.exports = router;
