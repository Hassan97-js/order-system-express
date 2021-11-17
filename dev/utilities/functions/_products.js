const { Product } = require("../creators/createProduct");

async function renderProductName(productId) {
  const products = await Product.find();
  let responseMessage = "No product with this name/id";
  for (const product of products) {
    if (productId === product.productId) {
      responseMessage = `You are on ${product.productName} page`;
      break;
    }
  }
  return responseMessage;
}

module.exports = { renderProductName };
