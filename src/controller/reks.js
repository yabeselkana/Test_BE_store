const createError = require("http-errors");
const { selectAll, selectSearchRak, select, insert, update, deleteData, countData, findId } = require("../model/raks");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");

const Joi = require("joi");
// const user = require('../controller/users')

const Schema = Joi.object({
  name_rak: Joi.string().required(),
  location: Joi.string().required(),
  capacity: Joi.number().required(),
  id_category: Joi.number().required(),
});

const rakController = {
  getAllRak: async (req, res, next) => {
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
  getSearchRak: async (req, res, next) => {
    try {
      const sort = req.query.sort || "ASC";
      const keyword = req.query.keyword || "";
      const result = await selectSearchRak({ keyword, sort });
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
  getDetailRak: async (req, res, next) => {
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
  createRak: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 400, error.message);
      }
      const { name_rak, location, capacity, id_category } = req.body;

      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const data = {
        id,
        name_rak,
        location,
        capacity,
        id_category,
      };
      insert(data)
        .then((result) => commonHelper.response(res, data, 201, "raks created", {}))
        .catch((err) => res.send(err));
    } catch (error) {}
  },
  updateRak: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 400, error.message);
      }

      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = Number(req.params.id);

      const { name_rak, location, capacity, id_category } = req.body;

      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name_rak,
        location,
        capacity,
        id_category,
      };
      console.log(data);
      update(data)
        .then((result) => commonHelper.response(res, data, 200, "Rak updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteRak: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Rak deleted", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = rakController;
