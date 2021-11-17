const { mongoose } = require("../../db/mongoose/mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true,
    unique: true
  },
  productCost: {
    type: Number,
    required: true
  },
  productAmount: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);

function createProduct(productId, productName, productCost, productAmount) {
  const productDocument = new Product({
    productId,
    productName,
    productCost,
    productAmount
  });

  return productDocument;
}

module.exports = { createProduct, Product };
