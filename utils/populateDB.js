const mongoose = require("mongoose");
const Product = require("../models/product.model");

const dbUrl = "mongodb://localhost:27017/cashify-clone";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("connection successful");
});

async function addData() {
  const newProduct = await Product.create({
    brand: "apple",
    model: "iphone-7",
    price: 17000,
    quality: "good"
  });
  await newProduct.save(() => {
    console.log("saved");
  });
}
// addData()

async function fixData() {
//   const secondProduct = await Product.findOne({ architecture: 64 });
//   const imageUrl = secondProduct.imageUrl
//   const filter = { quality: "superb" }
//   const update = imageUrl
//   const firstProduct = await Product.findOneAndUpdate(filter, {imageUrl: update});


// //   await firstProduct.imageUrl.push(...secondProduct.imageUrl);
//   console.log(firstProduct);
//   console.log(imageUrl);
//   await firstProduct.save();
//   console.log("saved");

const product = await Product.findOne({quality: 'good'})
console.log(product);
product.unitsLeft= 1
product.color = 'grey'
await product.save(console.log('saved'))
console.log(product)
}

fixData();
