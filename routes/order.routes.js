// packages
const express = require("express");
const router = express.Router();

// controllers
const {
  getOrdersByIds,
  generateOrder,
} = require("../controllers/order.controllers");

router.post("/new", generateOrder);
router.post("/my-orders", getOrdersByIds);

module.exports = router;
