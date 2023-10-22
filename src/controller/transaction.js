const createError = require("http-errors");
const { selectAll, selectSearchTransaction, select, insert, update, updateProduct, deleteData, countData, findId, findStock } = require("../model/transaction");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");

const Joi = require("joi");
// const user = require('../controller/users')

const Schema = Joi.object({
  id_product: Joi.number().required(),
  qty: Joi.number().required(),
  price: Joi.number().required(),
});

const transactionController = {
  getAllTransaction: async (req, res, next) => {
    try {
      const keyword = req.query.keyword || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAll({ limit, offset, sort, sortby, keyword });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success", pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getSearchTransaction: async (req, res, next) => {
    try {
      const sort = req.query.sort || "ASC";
      const keyword = req.query.keyword || "";
      const result = await selectSearchTransaction({ keyword, sort });
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
  getDetailTransaction: async (req, res, next) => {
    const id = Number(req.params.id);
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success from database", {});
      })
      .catch((err) => res.send(err));
  },
  createTransaction: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 500, error.message);
      }
      const { id_product, qty, price } = req.body;
      const {
        rows: [cekStock],
      } = await findStock(id_product);

      const cek = cekStock.stock;

      console.log(cekStock.stock);
      if (cek == 0) {
        return next(createError(403, ` Product Tidak Tersedia Stock: ${cek}`));
      } else if (qty > cek) {
        return next(createError(403, ` Produk Hanya  ${cek} `));
      }
      const quality = cekStock.stock - qty;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const data = {
        id,
        id_product,
        qty,
        price,
      };

      console.log(data);

      insert(data)
        .then((result) => commonHelper.responseSisa(res, data, 201, "Transaksi created", quality))
        .catch((err) => res.send(err));

      const datas = {
        id_product,
        quality,
      };
      console.log(datas);
      updateProduct(datas);
    } catch (error) {}
  },
  updateTransaction: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 400, error.message);
      }

      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = Number(req.params.id);

      const { id_product, qty, price } = req.body;
      const {
        rows: [cekStock],
      } = await findStock(id_product);

      const cek = cekStock.stock;

      console.log(cekStock.stock);
      if (cek == 0) {
        return next(createError(403, ` Product Tidak Tersedia Stock: ${cek}`));
      } else if (qty > cek) {
        return next(createError(403, ` Produk Hanya  ${cek} `));
      }
      const quality = cekStock.stock - qty;

      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        id_product,
        qty,
        price,
      };
      console.log(data);
      update(data)
        .then((result) => commonHelper.response(res, data, 201, "Transaksi Update", quality))
        .catch((err) => res.send(err));
      const datas = {
        id_product,
        quality,
      };
      console.log(datas);
      updateProduct(datas);
    } catch (error) {
      console.log(error);
    }
  },
  deleteTransaction: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Transaksi  deleted", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = transactionController;
