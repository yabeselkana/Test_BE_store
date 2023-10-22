const Pool = require("../config/db");

const selectAllCatagory = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT * FROM categorys order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchCatagory = (keyword) => {
  return Pool.query(`SELECT * FROM categorys where name ilike '%${keyword}%' `);
};

const selectCatagory = (id) => {
  return Pool.query(`SELECT * FROM categorys WHERE id=${id}`);
};

const insertCatagory = (data) => {
  const { id, name_category } = data;
  return Pool.query(`INSERT INTO categorys (id,name_category ) VALUES(${id} ,'${name_category}')`);
};

const updateCatagory = (data) => {
  const { id, name_category } = data;
  return Pool.query(`UPDATE categorys SET name_category ='${name_category}' WHERE id=${id}`);
};

const deleteCatagory = (id) => {
  return Pool.query(`DELETE FROM categorys WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM categorys");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM categorys WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllCatagory,
  selectSearchCatagory,
  selectCatagory,
  insertCatagory,
  updateCatagory,
  deleteCatagory,
  countData,
  findId,
};
