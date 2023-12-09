const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  // Otros campos relevantes para la venta
});

module.exports = mongoose.model('Sale', saleSchema);
