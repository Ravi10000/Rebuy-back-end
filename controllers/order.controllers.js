const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const sendEmail = require("../utils/emailer");

module.exports.generateOrder = async (req, res) => {
  try {
    console.log("-----------------------------------");
    console.log("-----------------------------------");
    console.log("-----------------------------------");
    console.log("-----------------------------------");
    const { orders } = req.body;
    const user = req.user;
    // let orderList = [];
    orders.forEach(async (productId) => {
      let product = await Product.findById(productId);
      let newOrder = await Order.create({ user, product });
      // user.orders.push(newOrder);
      // await orderList.push(newOrder._id);
      // console.log({ orderList });
      // sendEmail(
      //     user.username,
      //     "Order placed successfully",
      //     `
      // Your order for ${product.brand} ${product.model} ${product.ram}gb + ${product.storage}gb
      // color ${product.color} is placed successfully.

      // Your order id is "${newOrder._id}"
      // Our executive will contact you shortly.
      // Thank you for using our service.
      // www.mrphonex.com
      // `
      //   );
    });
    // console.log({ orderList });
    // user.orders = await [...user.orders, ...orderList];
    await user.save();
    console.log(user);

    return res.send(user);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }

  // try {
  //   const { id } = req.body;
  //   const product = await Product.findById(id);
  //   const user = req.user;
  //   const newOrder = await Order.create({ user, product });
  //   user.orders.push(newOrder);
  //   await user.save();
  // sendEmail(
  //   user.username,
  //   "Order placed successfully",
  //   `
  // Your order for ${product.brand} ${product.model} ${product.ram}gb + ${product.storage}gb
  // color ${product.color} is placed successfully.

  // Your order id is "${newOrder._id}"
  // Our executive will contact you shortly.
  // Thank you for using our service.
  // www.mrphonex.com
  // `
  // );
  //   product.units -= 1;
  //   await product.save();
  //   res.send({ user });
  // } catch (error) {
  //   console.log(error);
  //   res.send({ error });
  // }
};

module.exports.getOrdersByIds = async (req, res) => {
  try {
    const { orderIds } = req.body;
    const orders = await Order.find({ _id: { $in: orderIds } }).populate(
      "product",
      "_id images brand model ram storage quality color"
    );
    res.send({ orders });
  } catch (error) {
    res.send({ error });
  }
};
