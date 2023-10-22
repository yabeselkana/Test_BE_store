const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

const { protect } = require("../middlewares/auth");

router
  .get("/", productController.getAllProduct)
  .get("/search/", productController.getSearcProduct)
  .get("/:id", productController.getDetailProduct)
  .post("/", productController.createProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = router;
