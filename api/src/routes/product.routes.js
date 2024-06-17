const express = require("express");
const router = express.Router();

// Import the product controller methods
const productController = require("../controllers/product.controller");

// Define routes
router.post("/", productController.createProduct); // Create a new product
router.put("/:id", productController.updateProduct); // Update a product by ID
router.delete("/:id", productController.deleteProduct); // Delete a product by ID
router.get("/", productController.getProducts); // Get all products
router.get("/:id", productController.getProductById); // Get a product by ID

module.exports = router;
