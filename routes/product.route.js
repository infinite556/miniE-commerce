const express = require("express");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

const { vaildtoken } = require("../middleware/isLoggedIn");

const router = express.Router();

// Get all products
router.get("/products", getProducts);

// Get one product
router.get("/products/:id", getProduct);

// Create product
router.post("/products", vaildtoken, createProduct);

// Update product
router.put("/products/:id", vaildtoken, updateProduct);

// Delete product
router.delete("/products/:id", vaildtoken, deleteProduct);

module.exports = router;