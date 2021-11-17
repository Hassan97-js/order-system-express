const { mongoose } = require("../../db/mongoose/mongoose");

// Create Orders (user-id, product-id, date)

const orderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  orderDate: {
    type: String,
    required: true
  }
});

const Order = mongoose.model("Order", orderSchema);

function createOrder(userId, productId, orderDate) {
  const orderDocument = new Order({
    userId,
    productId,
    orderDate
  });

  return orderDocument;
}

module.exports = { createOrder, Order };
