const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  _id: Number,
  item: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("Order", OrderSchema, "Order");
