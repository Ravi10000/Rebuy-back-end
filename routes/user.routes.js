// packages
const express = require("express");
const passport = require("passport");

// controllers
const {
  signUpUser,
  signInUser,
  signOutUser,
  getUser,
  generateOrder,
  updateUserProfile,
  addProductToCart,
  removeProductFromCart,
  populateCart,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/signup", signUpUser);
router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureMessage: true,
    failureFlash: false,
  }),
  signInUser
);
router.put("/cart", addProductToCart);
router.delete("/cart", removeProductFromCart);
router.get("/cart", populateCart);
router.put("/signout", signOutUser);
router.put("/generate-order", generateOrder);
router.put("/", updateUserProfile);
router.get("/", getUser);

module.exports = router;
