const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);