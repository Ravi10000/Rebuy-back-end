// models
const User = require("../models/user.model");
const Order = require("../models/order.model");
const sendEmail = require("../utils/emailer");
const Product = require("../models/product.model");

// sign up user and send user to client
module.exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name: name.toLowerCase(),
      username: email.toLowerCase(),
      "phone number": req.body["phone number"],
    });
    const registeredUser = await User.register(user, password);
    sendEmail(
      email,
      "successfully registered",
      `You've been successfully registered with us. Thank you - mrphonex.com`
    );
    req.login(registeredUser, (error) => {
      if (!error) {
        return res.send(req.user);
      }
      return res.send({ error });
    });
  } catch (error) {
    console.log(error.message);
    res.send({ error });
  }
};

// sign in user and send user to client
module.exports.signInUser = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.send(req.user);
    } else return res.send(null);
  } catch (error) {
    res.send({ error });
  }
};

// sign out user
module.exports.signOutUser = (req, res) => {
  try {
    req.logout(() => {
      res.status(200).send(req.user);
    });
  } catch (error) {
    res.send({ error });
  }
};

// fetch user from req.body and send it to client
module.exports.getUser = (req, res) => {
  try {
    console.log({authenticated: req.user});
    if (req.isAuthenticated()) {
      return res.send(req.user);
    } else return res.send(null);
  } catch (error) {
    res.send({ error });
  }
};

//
module.exports.generateOrder = async (req, res) => {
  try {
    const { product } = req.body;
    const user = req.user;
    const newOrder = await Order.create({ user, product });
    user.orders.push(newOrder);
    await user.save();
    res.send({ user });
  } catch (error) {
    res.send({ error });
  }
};

// update user info and send updated user to client
module.exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body.userUpdates,
      {
        new: true,
      }
    );
    await user.save();
    res.send({ user });
  } catch (error) {
    res.send({ error });
  }
};

module.exports.addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (user.cart.includes(productId)) {
      return res.send(null);
    }
    user.cart.push(productId);
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

module.exports.populateCart = async (req, res) => {
  try {
    const user = req.user;
    await user.populate("cart");
    res.send(user.cart);
  } catch (error) {
    res.send({ error });
  }
};

module.exports.removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;
    const newUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { cart: productId } },
      { new: true }
    );
    res.send(newUser);
  } catch (error) {
    res.send({ error });
  }
};
