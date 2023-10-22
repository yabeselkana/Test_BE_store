const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transaction");

const { protect } = require("../middlewares/auth");

router
  .get("/", transactionController.getAllTransaction)
  .get("/search/", transactionController.getSearchTransaction)
  .get("/:id", transactionController.getDetailTransaction)
  .post("/", transactionController.createTransaction)
  .put("/:id", transactionController.updateTransaction)
  .delete("/:id", transactionController.deleteTransaction);

module.exports = router;
