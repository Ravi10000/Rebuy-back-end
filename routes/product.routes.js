const express = require("express");

// controllers
const {
  index,
  fetchProductById,
  searchAndSend
} = require("../controllers/product.controllers");

const router = express.Router();

router.get('/query', searchAndSend)
router.get("/:id", fetchProductById);
router.get("/", index);

module.exports = router;
