const createError = require("http-errors");
const { selectAll, selectSearchProduct, select, insert, update, deleteData, countData, countDataRak, findId, findCapacity } = require("../model/products");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");

const Joi = require("joi");
// const user = require('../controller/users')

const Schema = Joi.object({
  name: Joi.string().required(),
  stock: Joi.number().required(),
  price: Joi.number().required(),
  id_category: Joi.number().required(),
  id_locRak: Joi.number().required(),
});

const productController = {
  getAllProduct: async (req, res, next) => {
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
  getSearcProduct: async (req, res, next) => {
    try {
      const sort = req.query.sort || "ASC";
      const keyword = req.query.keyword || "";
      const result = await selectSearchProduct({ keyword, sort });
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
  getDetailProduct: async (req, res, next) => {
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
  createProduct: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 500, error.message);
      }
      const { name, stock, price, id_category, id_locRak } = req.body;

      const {
        rows: [cekCapacity],
      } = await findCapacity(id_locRak);

      const cekKapasitas = cekCapacity.capacity;

      const {
        rows: [count],
      } = await countData();

      const {
        rows: [countRak],
      } = await countDataRak(id_locRak);

      const AllitemRak = parseInt(countRak.count);

      console.log(AllitemRak);

      const sisa = cekKapasitas - AllitemRak;

      if (cekKapasitas - 1 < AllitemRak) {
        return next(createError(403, ` Capasity Full  sisa: ${sisa}`));
      }
      const id = Number(count.count) + 1;
      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const data = {
        id,
        name,
        stock,
        price,
        id_category,
        id_locRak,
      };

      insert(data)
        .then((result) => commonHelper.responseCapacity(res, data, 201, "Product created", cekKapasitas, sisa))
        .catch((err) => res.send(err));
    } catch (error) {}
  },
  updateProduct: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 400, error.message);
      }

      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = Number(req.params.id);

      const { name, stock, price, id_category, id_locRak } = req.body;
      const {
        rows: [cekCapacity],
      } = await findCapacity(id_locRak);

      const cekKapasitas = cekCapacity.capacity;

      const {
        rows: [countRak],
      } = await countDataRak(id_locRak);

      const AllitemRak = parseInt(countRak.count);

      const sisa = cekKapasitas - AllitemRak;

      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name,
        stock,
        price,
        id_category,
        id_locRak,
      };

      update(data)
        .then((result) => commonHelper.responseCapacity(res, data, 200, "Product updated", cekKapasitas, sisa))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Product  deleted", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
