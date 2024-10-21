const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Journal = require('../models/journalModel');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let transformation = [];

    // Apply transformation only if the file is an image
    if (file.mimetype.startsWith('image')) {
      transformation = [{ width: 500, height: 500, crop: 'limit' }];
    }

    // Determine folder and public_id based on the field name
    let folder;
    let public_id;

    if (file.fieldname === 'imageCover') {
      folder = 'covers'; // Folder for image covers
      public_id = `cover-${Date.now()}`;
    } else if (file.fieldname === 'journal') {
      folder = 'journals'; // Folder for payment proofs
      public_id = `journal-${Date.now()}`;
    }

    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'], // Allowed formats for both fields
      transformation, // Apply transformations if it's an image
      public_id, // Use unique public_id for each file
    };
  },
});

// Multer middleware to handle multiple fields
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB per file
}).fields([
  { name: 'imageCover', maxCount: 1 }, // Single file for imageCover
  { name: 'journal', maxCount: 1 }, // Single file for journal
]);

// Middleware to handle the upload
exports.uploadFiles = upload;

exports.uploadJournal = async (req, res) => {
  const { volume, number, month, year } = req.body;

  if (!volume) {
    return res.status(400).json({
      status: 'fail',
      message: 'Volume is required',
    });
  }

  if (!number) {
    return res.status(400).json({
      status: 'fail',
      message: 'Number is required',
    });
  }

  if (!month) {
    return res.status(400).json({
      status: 'fail',
      message: 'Month is required',
    });
  }

  if (!year) {
    return res.status(400).json({
      status: 'fail',
      message: 'Year is required',
    });
  }

  // Validate imageCover file
  if (
    !req.files ||
    !req.files.imageCover ||
    req.files.imageCover.length === 0
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'Upload an image cover',
    });
  }

  // Validate images field
  if (!req.files || !req.files.journal || req.files.journal.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Upload a journal',
    });
  }

  try {
    const imageCover = req.files.imageCover[0].path; // Cloudinary URL

    const journal = req.files.journal[0].path; // Cloudinary URL

    const newJournal = await Journal.create({
      volume,
      number,
      month,
      year,
      imageCover,
      journal,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        newJournal,
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

exports.editJournal = async (req, res) => {
  const { volume, number, month, year } = req.body;

  const { journalId } = req.params;
  if (!journalId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Journal Id not found',
    });
  }

  try {
    const journal = await Journal.findById(journalId);
    if (!journal) {
      return res.status(404).json({
        status: 'fail',
        message: 'Journal not found',
      });
    }

    if (volume) {
      journal.volume = volume;
    }

    if (number) {
      journal.number = volume;
    }

    if (month) {
      journal.month = month;
    }

    if (year) {
      journal.year = year;
    }

    // Handle imageCover update
    const imageCover = req.files?.imageCover
      ? req.files.imageCover[0].path // Cloudinary URL
      : journal.imageCover;

    // Handle imageCover update
    const journalFile = req.files?.journal
      ? req.files.journal[0].path // Cloudinary URL
      : journal.journalFile;

    if (imageCover) {
      journal.imageCover = imageCover;
    }

    if (journalFile) {
      journal.journal = journalFile;
    }

    await journal.save();

    return res.status(200).json({
      status: 'success',
      data: {
        journal,
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

exports.deleteJournal = async (req, res) => {
  const { journalId } = req.params;

  if (!journalId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Journal Id is required',
    });
  }

  try {
    const journal = await Journal.findById(journalId);

    if (!journal) {
      return res.status(404).json({
        status: 'fail',
        message: 'Journal not found',
      });
    }

    // Delete the editor
    await journal.deleteOne();

    return res.status(200).json({
      status: 'success',
      message: 'Journal deleted successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
