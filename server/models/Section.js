const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: { type: Array, required: true }
});

module.exports = mongoose.model('Section', SectionSchema);
