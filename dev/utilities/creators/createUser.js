const { mongoose } = require("../../db/mongoose/mongoose");

// unique property to ensure to not store duplicate values in DB
const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  }
});

// User Model/Collection
const User = mongoose.model("User", userSchema);

function createUser(userId, firstName, lastName, adress) {
  // User Object/Document
  const userDoucment = new User({
    userId,
    firstName,
    lastName,
    adress
  });

  return userDoucment;
}

module.exports = { createUser, User };
