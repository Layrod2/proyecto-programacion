const mongoose = require('mongoose');
const { Schema } = mongoose;

const Category = new Schema({
  category: {type: String, require: true},
  description: {type: String, require: true},
  cantidad: {type: Number, default:0}
});

module.exports = mongoose.model('Category', Category);
