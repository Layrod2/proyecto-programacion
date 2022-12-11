const mongoose = require('mongoose');
const { Schema } = mongoose;

const Note = new Schema({
  title: {type: String, require: true},
  description: {type: String, require: true},
  create_by: {type: String, require: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Note', Note);
