const mongoose = require('mongoose')

module.exports = mongoose.model('Send', new mongoose.Schema({
  filename: String,
  filesize: Number,
  code: String
}))