const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    volume: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
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
      enum: ['Under review', 'Approved', 'Declined'],
      default: 'Under review',
    },
  },
  {
    timestamps: true,
  },
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
