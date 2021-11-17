const mongoose = require("mongoose");

// Mongoose connecting to the database
async function main() {
  return await mongoose.connect(process.env.DB_CONNECTION);
}

module.exports = { mongoose, main };
