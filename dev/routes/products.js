const express = require("express");
const router = express.Router();

// IMPORTS

const { main } = require("../db/mongoose/mongoose");

const { createProduct, Product } = require("../utilities/creators/createProduct");

const { saveDocument } = require("../utilities/functions/_mongoose");
const { renderProductName } = require("../utilities/functions/_products");

router.get("/", (req, res) => {
  try {
    main().then(async () => {
      try {
        const products = [
          createProduct(1, "Taurus Gaming RTX 3060 - 3600", 15999, 10),
          createProduct(2, "Acer Nitro N50-620", 13990, 5),
          createProduct(3, "ASUS VivoBook 17", 7490, 20),
          createProduct(4, "MSI GF63 Gaming Laptop", 6990, 3)
        ];
        const [taurusGamingRTX, acerNitroRTX, asusVivoBook, gamingMsiGF63] = products;

        const allProducts = await Product.find();

        saveDocument(taurusGamingRTX);
        saveDocument(acerNitroRTX);
        saveDocument(asusVivoBook);
        saveDocument(gamingMsiGF63);
      } catch (error) {
        console.error("Duplicate product\n", error);
      }
    });
  } catch (error) {
    console.error(error);
  }
  res.send("Prodcuts page");
});

router.get("/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const responseMessage = await renderProductName(productId);

    res.send(responseMessage);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
