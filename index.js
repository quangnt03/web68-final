const express = require("express");
const connectToDb = require("./db");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const app = express();

const InventorySchema = mongoose.Schema({
  _id: Number,
  sku: String,
  descriptiom: String,
  instock: Number,
});
const Inventory = mongoose.model(
  "Inventory",
  mongoose.Schema({
    _id: Number,
    sku: String,
    descriptiom: String,
    instock: Number,
  })
);

app.get(
  "/inventory",
  asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "work" });
  })
);

connectToDb().then(() => {
  app.listen(3000, () => {
    console.log("App is running at 3000");
  });
});
