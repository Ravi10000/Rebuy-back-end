const Product = require("../models/product.model");

// fetch all products from database and send them to client
module.exports.index = async (req, res) => {
  try {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const products = await Product.find({})
      .skip(skip)
      .limit(limit)
      .select("_id brand model price quality units ram storage images")
      .sort({ createdAt: -1 });
    if (skip) {
      res.send({ products });
      return;
    }
    const productsCount = await Product.countDocuments();
    res.send({ products, productsCount });
  } catch (error) {
    res.send({ error });
  }
};
module.exports.searchAndSend = async (req, res) => {
  try {
    const { search, filter } = req.query;
    // console.log({ query });
    const products = await Product.find({[filter]: search})
    console.log({products})
    // if(!query){
       
    // }
    res.send({ search, filter });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
};

// fetch product by id from database and send it to client
module.exports.fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    await res.send({ product });
  } catch (error) {
    res.send({ error });
  }
};
