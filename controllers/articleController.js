const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Article = require('../models/articleModel');

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
    // Set folder and public_id for imageCover
    let folder = 'articles'; // Folder for image covers
    let public_id = `article-${Date.now()}`; // Unique public_id based on current timestamp

    return {
      folder,
      allowed_formats: ['pdf', 'docx'], // Allowed formats for the image cover
      public_id, // Use unique public_id for the image cover
    };
  },
});

// Multer middleware to handle a single imageCover field
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single('article'); // Handle only a single 'imageCover' field

// Middleware to handle the upload
// Middleware function to handle file uploads and errors
exports.uploadFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          status: 'fail',
          message: 'File size should not exceed 10MB',
        });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          status: 'fail',
          message: 'Limit expected',
        });
      }
      if (err.message === 'An unknown file format not allowed') {
        return res.status(400).json({
          status: 'fail',
          message: 'Unsupported  file  format',
        });
      }
    } else if (err) {
      // Handle general errors
      console.log(err);
      return res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }

    // Proceed if no errors
    next();
  });
};

exports.createArticle = async (req, res) => {
  const { journalId } = req.params;

  if (!journalId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Journal Id is required',
    });
  }

  const { title, pageNumber, abstract, authors } = req.body;
  if (!title) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title is required',
    });
  }

  if (!pageNumber) {
    return res.status(400).json({
      status: 'fail',
      message: 'Page number is required',
    });
  }

  if (!abstract) {
    return res.status(400).json({
      status: 'fail',
      message: 'Abstract is required',
    });
  }

  if (!authors) {
    return res.status(400).json({
      status: 'fail',
      message: 'At least one author is required',
    });
  }

  // Validate that a file has been uploaded
  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'Upload an article',
    });
  }

  try {
    const article = req.file.path; // Cloudinary URL

    const newArticle = await Article.create({
      journal: journalId,
      title,
      abstract,
      article,
      authors: JSON.parse(authors),
      pageNumber,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        newArticle,
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

exports.editArticle = async (req, res) => {
  const { articleId } = req.params;

  if (!articleId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Article Id is required',
    });
  }

  const { title, abstract, authors, pageNumber, keywords } = req.body;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({
        status: 'fail',
        message: 'Article not found',
      });
    }

    if (title) {
      article.title = title;
    }

    if (abstract) {
      article.abstract = abstract;
    }

    if (authors) {
      article.authors = authors;
    }

    if (pageNumber) {
      article.pageNumber = pageNumber;
    }

    const articleFile = req.files?.article
      ? req.files.article[0].path // Cloudinary URL
      : article.articleFile;

    if (articleFile) {
      article.article = articleFile;
    }

    const newArticle = await article.save();

    return res.status(200).json({
      status: 'success',
      data: {
        newArticle,
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

exports.deleteArticle = async (req, res) => {
  const { articleId } = req.params;

  if (!articleId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Article Id is required',
    });
  }

  try {
    const article = await Article.findById(article);

    if (!article) {
      return res.status(400).json({
        status: 'fail',
        message: 'Article not found',
      });
    }

    await article.deleteOne();

    return res.status(200).json({
      status: 'success',
      message: 'Article deleted successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// exports.submitArticle
