const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
});

module.exports = mongoose.model('FileItem', fileSchema);
