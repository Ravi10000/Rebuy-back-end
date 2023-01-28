const mongoose = require("mongoose"); // Erase if already required
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  "phone number": {
    type: String,
    required: true,
    unique: true,
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Order",
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
  },
  address: String,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
