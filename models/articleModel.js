const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
});

const articleSchema = new mongoose.Schema({
  journal: {
    type: mongoose.Schema.ObjectId,
    ref: 'Journal',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: [authorSchema],
  abstract: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [
      'Under review',
      'Accept Article',
      'Reject Article',
      'Minor Revision',
      'Major Revision',
    ],
    default: 'Accept Article',
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
