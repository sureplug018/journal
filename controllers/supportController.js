const Support = require('../models/supportModel');
const User = require('../models/userModel');
// const Reply = require('../models/repliedSupportsModel');
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.createSupport = async (req, res) => {
  try {
    if (!req.body.userId) req.body.userId = req.user.id;
    const newSupport = await Support.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newSupport,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.getAllSupports = async (req, res) => {
  try {
    const supports = await Support.find();
    res.status(200).json({
      status: 'success',
      result: supports.length,
      data: {
        supports,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.replySupport = async (req, res) => {
  const { supportId } = req.params;
  const { subject, message } = req.body;

  try {
    // Find the support message by email
    const support = await Support.findById(supportId);
    const email = support.email;

    if (!support) {
      return res.status(404).json({
        status: 'fail',
        message: 'Support message not found',
      });
    }

    // Send a reply email to the user
    await sendReplyEmail(email, subject, message);

    // Delete the support message
    await Support.findByIdAndDelete(support._id);

    return res.status(200).json({
      status: 'success',
      message: 'Reply sent and support message deleted',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

async function sendReplyEmail(email, subject, message) {
  const mailOptions = {
    from: '"The Flagship Journal" <editor@theflagshipjournal.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<p>${message}</p>`, // html body
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    throw new Error('Failed to send email');
  }
}

exports.sendMail = async (req, res) => {
  const id = req.params.id;
  const { subject, message } = req.body;

  try {
    // Find the support message by email
    const user = await User.findById({ _id: id });
    const email = user.email;

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Send a reply email to the user
    await sendReplyEmail(email, subject, message);

    return res.status(200).json({
      status: 'success',
      message: 'Message Sent',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
