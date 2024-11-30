const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const multer = require('multer');

const router = express.Router();

router.post('/signup', authController.signup);

const upload = multer({ dest: 'public/img/users' });

router.post('/confirm-email/:token/', authController.confirmEmailBE);

router.post('/login', authController.login);

router.post('/admin-login', authController.loginAdmin);

router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

// // Assuming '/update' is the route where user data can be updated
router.patch(
  '/update',
  authController.protect,
  // userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  authController.updateUserData,
);

router.delete(
  '/deleteUser/:id',
  authController.protect,
  authController.restrictTo('admin'),
  authController.deleteUser,
);

router.patch(
  '/change-role',
  authController.protect,
  authController.restrictTo('super-admin'),
  userController.changeUserRole,
);

module.exports = router;
