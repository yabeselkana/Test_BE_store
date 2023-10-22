const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT * FROM raks where name_rak ilike '%${keyword}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchRak = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM raks  where 	name_rak ilike '%${keyword}%'`);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM raks  WHERE id='${id}'`);
};
const insert = (data) => {
  const { id, name_rak, location, capacity, id_category } = data;
  return Pool.query(`INSERT INTO raks (id,name_rak,location,capacity,id_category) VALUES (${id},'${name_rak}','${location}',${capacity},${id_category})`);
};
const update = (data) => {
  const { id, name_rak, location, capacity, id_category } = data;
  return Pool.query(`UPDATE raks  SET name_rak='${name_rak}', location='${location}', capacity=${capacity}, id_category=${id_category}  WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM raks  WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM raks ");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM raks  WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAll,
  selectSearchRak,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
