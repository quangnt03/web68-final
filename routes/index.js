const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const controller = require("../controller");

const router = Router();

router.get("/inventory", asyncHandler(controller.getInventory));
router.get("/inventory", asyncHandler(controller.getInventory));

module.exports = router;
