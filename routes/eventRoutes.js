const express = require('express');
const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.post('/create-event', eventController.createEvent);

router.patch('/edit-event/:eventId', eventController.editEvent);

router.delete('/delete-event/:eventId', eventController.deleteEvent);

module.exports = router;
