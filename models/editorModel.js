const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  levelOfEducation: {
    type: String,
  },
  occupation: {
    type: String,
    required: true,
  },
});

const Editor = mongoose.model('Editor', editorSchema);

module.exports = Editor;
