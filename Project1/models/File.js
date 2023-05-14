const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  email: String,
  filename: String,
  originalname: String,
  path: String,
});

module.exports = mongoose.model('File', fileSchema);
