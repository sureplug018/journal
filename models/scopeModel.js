const mongoose = require('mongoose');

const scopeSchema = new mongoose.Schema({
  scope: {
    type: String,
    required: true,
  },
});

const Scope = mongoose.model('Scope', scopeSchema);

module.exports = Scope;
