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
exports.uploadFiles = upload;

exports.createArticle = async (req, res) => {
  const { title, abstract, authors, pageNumber, keywords } = req.body;
  if (!title) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title is required',
    });
  }

  if (!abstract) {
    return res.status(400).json({
      status: 'fail',
      message: 'Abstract is required',
    });
  }

  if (!pageNumber) {
    return res.status(400).json({
      status: 'fail',
      message: 'Page number is required',
    });
  }

  if (!keywords) {
    return res.status(400).json({
      status: 'fail',
      message: 'Keyword is required',
    });
  }

  if (!authors) {
    return res.status(400).json({
      status: 'fail',
      message: 'At least one author is required',
    });
  }

  // Validate images field
  if (!req.files || !req.files.article || req.files.article.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Upload an article',
    });
  }

  const { journalId } = req.params;

  if (!journalId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Journal Id is required',
    });
  }

  try {
    const article = req.files.article[0].path; // Cloudinary URL
    const newArticle = await Article.create({
      journal: journalId,
      title,
      abstract,
      authors,
      pageNumber,
      keywords,
      article,
    });

    return res.status({
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
