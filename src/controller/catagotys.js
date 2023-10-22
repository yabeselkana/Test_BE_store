const createError = require("http-errors");
const { selectAllCatagory, selectSearchCatagory, selectCatagory, insertCatagory, updateCatagory, deleteCatagory, countData, findId } = require("../model/catagorys");
const commonHelper = require("../helper/common");
const Joi = require("joi");

const Schema = Joi.object({
  name_category: Joi.string().required(),
});

const catagoryController = {
  getAllCatagory: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllCatagory({ limit, offset, sort, sortby });
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
  getSearchCatagory: async (req, res, next) => {
    try {
      const keyword = req.query.keyword || "";
      // const input = req.query.input || ""

      const result = await selectSearchCatagory(keyword);
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success", {});
    } catch (error) {
      console.log(error);
    }
  },
  getDetailCatagory: async (req, res, next) => {
    const id = Number(req.params.id);
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    selectCatagory(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success", {});
      })
      .catch((err) => res.send(err));
  },
  createCatagory: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 400, error.message);
      }

      const PORT = process.env.PORT || 8080;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const { name_category } = req.body;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const data = {
        id,
        name_category,
      };
      console.log(data);
      insertCatagory(data)
        .then((result) => {
          commonHelper.response(res, data, 201, "Catagory created", {});
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error.message);
      console.error(error);
      commonHelper.response(res, null, 500, "Error creating users!");
    }
  },
  updateCatagory: async (req, res, next) => {
    try {
      const { error, value } = Schema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 400, error.message);
      }
      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = Number(req.params.id);
      const { name_category } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name_category,
      };
      console.log(data);
      updateCatagory(data)
        .then((result) => commonHelper.response(res, data, 200, "Catagory updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCatagory: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteCatagory(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Catagory deleted", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = catagoryController;
