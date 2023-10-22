const express = require("express");
const router = express.Router();

const CatagoryRouter = require("../routes/catagorys");
const RakRouter = require("../routes/raks");
const TransactionRouter = require("../routes/transaction");
const productsRouter = require("../routes/products");
const UsersRouter = require("./users");

router.use("/catagorys", CatagoryRouter);
router.use("/raks", RakRouter);
router.use("/transaction", TransactionRouter);
router.use("/products", productsRouter);
router.use("/users", UsersRouter);

module.exports = router;
