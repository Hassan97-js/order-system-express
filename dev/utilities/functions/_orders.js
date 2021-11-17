const { Order } = require("../creators/createOrder");
const { User } = require("../creators/createUser");
const { Product } = require("../creators/createProduct");

async function mapOrdersOntoUsers(userId) {
  const orders = await Order.find();
  const users = await User.find();

  let responseMessage = "No order with this name/id";

  const mapUsers = {};
  for (const user of users) {
    mapUsers[`userId${user.userId}`] = { userId: user.userId, firstName: user.firstName };
  }

  for (const order of orders) {
    if (userId === order.userId && order.userId === mapUsers[`userId${order.userId}`].userId) {
      const user = mapUsers[`userId${order.userId}`].firstName;
      responseMessage = `You are on ${user}´s ordered products page`;
      break;
    }
  }

  return responseMessage;
}

async function mapOrdersOntoProductsUsers(userId, productId) {
  const products = await Product.find();
  const orders = await Order.find();
  const users = await User.find();

  let responseMessage = "No order with this name/id";

  const mapUsers = {};
  for (const user of users) {
    mapUsers[`userId${user.userId}`] = { userId: user.userId, firstName: user.firstName };
  }

  const mapProducts = {};
  for (const product of products) {
    mapProducts[`productId${product.productId}`] = { productId: product.productId, productName: product.productName };
  }

  for (const order of orders) {
    const currentUser = mapUsers[`userId${order.userId}`].firstName;
    const currentProduct = mapProducts[`productId${order.productId}`].productName;

    const requestedUser = mapUsers[`userId${userId}`]?.firstName;
    const requestedProduct = mapProducts[`productId${productId}`]?.productName;

    if (
      userId === order.userId &&
      productId === order.productId &&
      order.userId === mapUsers[`userId${order.userId}`].userId &&
      order.productId === mapProducts[`productId${order.productId}`].productId
    ) {
      responseMessage = `You are on ${currentUser}´s ordered product: ${currentProduct} page`;
      break;
    } else if (!requestedUser || !requestedProduct) {
      responseMessage = `No user/product with this id.`;
    } else {
      responseMessage = `${requestedUser}´s didn't order ${requestedProduct}.`;
    }
  }

  return responseMessage;
}

module.exports = { mapOrdersOntoUsers, mapOrdersOntoProductsUsers };
