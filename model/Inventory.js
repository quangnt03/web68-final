const mongoose = require("mongoose");

const InventorySchema = mongoose.Schema({
  _id: Number,
  sku: String,
  descriptiom: String,
  instock: Number,
});
const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
