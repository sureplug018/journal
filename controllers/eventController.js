const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  const { title, details } = req.body;

  if (!title) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title of event is required',
    });
  }
  if (!details) {
    return res.status(400).json({
      status: 'fail',
      message: 'Details of event is required',
    });
  }
  try {
    const newEvent = await Event.create({
      title,
      details,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        newEvent,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.editEvent = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Editor Id is required',
    });
  }
  try {
    const { title, details } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(400).json({
        status: 'fail',
        message: 'Event not found',
      });
    }

    if (title) {
      event.title = title;
    }

    if (details) {
      event.details = details;
    }

    const newEvent = await event.save();

    return res.status(200).json({
      status: 'success',
      data: {
        newEvent,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Editor Id is required',
    });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(400).json({
        status: 'fail',
        message: 'Event not found',
      });
    }

    // Delete the editor
    await event.deleteOne();

    return res.status(200).json({
      status: 'success',
      message: 'Event deleted successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
