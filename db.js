const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:admin@my-database.zct8dot.mongodb.net/";

module.exports = async function () {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB...");
  } catch (err) {
    throw new Error("Error while connecting to database:", err);
  }
};
