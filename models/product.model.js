const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    storage: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    chipset: {
      type: String,
      required: true,
    },
    cpu: {
      type: String,
      required: true,
    },
    "battery capacity": {
      type: Number,
      required: true,
    },
    "front camera": {
      type: String,
      required: true,
    },
    "back camera": {
      type: String,
      required: true,
    },
    gpu: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
