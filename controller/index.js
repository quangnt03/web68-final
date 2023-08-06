const Inventory = require("../model/Inventory");

module.exports = {
  async getInventory(_, res) {
    const inventory = await Inventory.find();
    res.status(200).json({ inventory });
  },
};
