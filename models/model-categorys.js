const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  // Otros campos relevantes para la categoría
});

module.exports = mongoose.model('Category', categorySchema);
