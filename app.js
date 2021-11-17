// IMPORTS
const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/env/.env" });

const { main } = require("./dev/db/mongoose/mongoose");

// ROUTES
const homeRoute = require("./dev/routes/home");
const usersRoute = require("./dev/routes/users");
const productsRoute = require("./dev/routes/products");
const ordersRoute = require("./dev/routes/orders");

// Built-in middlewares
app.use(express.json());

main()
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("Connection failed\n", error));

// Middlewares
app.use("/", homeRoute);
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

// Defualt 404 page
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// server listning to requests
app.listen(process.env.PORT || 3000);
