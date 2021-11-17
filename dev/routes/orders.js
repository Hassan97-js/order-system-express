const express = require("express");
const router = express.Router();

// IMPORTS
const { main } = require("../db/mongoose/mongoose");

const { createOrder, Order } = require("../utilities/creators/createOrder");
const { Product } = require("../utilities/creators/createProduct");
const { User } = require("../utilities/creators/createUser");

const { saveDocument } = require("../utilities/functions/_mongoose");
const { mapOrdersOntoUsers, mapOrdersOntoProductsUsers } = require("../utilities/functions/_orders");

router.get("/", (req, res) => {
  try {
    main().then(async () => {
      try {
        const ordersDates = ["1/11/2021", "6/11/2021", "3/9/2021", "22/8/2021"];
        const [date1, date2, date3, date4] = ordersDates;
        const orders = [
          createOrder(1, 3, date1),
          createOrder(2, 1, date2),
          createOrder(4, 2, date4),
          createOrder(3, 4, date3)
        ];
        const [firstOrder, secondOrder, thirdOrder, fourthOrder] = orders;

        const allOrders = await Order.find();

        saveDocument(firstOrder);
        saveDocument(secondOrder);
        saveDocument(thirdOrder);
        saveDocument(fourthOrder);
      } catch (error) {
        console.error(error);
      }
    });
    res.send("Orders page");
  } catch (error) {
    console.error(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const responseMessage = await mapOrdersOntoUsers(userId);

    res.send(responseMessage);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:userId/:productId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const productId = Number(req.params.productId);
    const responseMessage = await mapOrdersOntoProductsUsers(userId, productId);

    res.send(responseMessage);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
