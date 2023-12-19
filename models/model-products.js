const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  state: {
    type: Boolean,
    default: true,
  },
  image:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Product', productSchema);
