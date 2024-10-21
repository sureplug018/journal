const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  volume: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  imageCover: {
    type: String,
    required: true,
  },
  journal: {
    type: String,
    require: true,
  },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
