const mongoose = require("mongoose"); // Erase if already required
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  "phone number": {
    type: String,
    required: true,
    unique: true,
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Order",
  },
  address: String,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
