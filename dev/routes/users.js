const express = require("express");
const router = express.Router();

// IMPORTS
const { main } = require("../db/mongoose/mongoose");

const { createUser, User } = require("../utilities/creators/createUser");

const { saveDocument } = require("../utilities/functions/_mongoose");
const { renderUserName } = require("../utilities/functions/_users");

router.get("/", (req, res) => {
  try {
    main()
      .then(async () => {
        try {
          const users = [
            createUser(1, "Hassan", "Doe", "3376 Veltri Drive, Anchorage, Alaska"),
            createUser(2, "Tarik", "Doe", "891 Amethyst Drive, Lansing, Michigan"),
            createUser(3, "Fares", "Doe", "3585 Zappia Drive, Danville, Kentucky"),
            createUser(4, "Diane", "T. Crouch", "4361 Mill Street, Gaffney, South Carolina")
          ];
          const [hassan, tarik, fares, diane] = users;

          saveDocument(hassan);
          saveDocument(tarik);
          saveDocument(fares);
          saveDocument(diane);
        } catch (error) {
          console.error("Duplicate user\n", error);
        }
      })
      .catch((error) => console.error(error));
    res.send("We are on users page");
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const responseMessage = await renderUserName(userId);

    res.send(responseMessage);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
