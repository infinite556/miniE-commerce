const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
      minlength: [2, "product name must be at least 2 characters"],
    },

    description: {
      type: String,
      required: [true, "product description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [0, "price cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "product category is required"],
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    stock: {
      type: Number,
      required: [true, "product stock is required"],
      min: [0, "stock cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;