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


router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", vaildtoken, createProduct);
router.put("/products/:id", vaildtoken, updateProduct);
router.delete("/products/:id", vaildtoken, deleteProduct);

module.exports = router;