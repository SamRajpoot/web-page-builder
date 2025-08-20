const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: { type: Array, required: true }
});

module.exports = mongoose.model('Template', TemplateSchema);
