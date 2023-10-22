const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT
  products.id,
  products.name,
  products.stock,
  categorys.name_category,
  raks.name_rak,
  raks.location,
  products.price
FROM products
JOIN categorys
  ON products.id_category = categorys.id
JOIN raks
  ON products.id_locRak = raks.id  where 	raks.location  ilike '%${keyword}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchProduct = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM products  where 	name  ilike '%${keyword}%'`);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM products  WHERE id='${id}'`);
};
const insert = (data) => {
  const { id, name, stock, price, id_category, id_locRak } = data;
  return Pool.query(`INSERT INTO products (id, name , stock , price , id_category , id_locRak ) VALUES (${id},'${name}',${stock},${price},${id_category},${id_locRak})`);
};
const update = (data) => {
  const { id, name, stock, price, id_category, id_locRak } = data;
  return Pool.query(`UPDATE products  SET name='${name}', stock=${stock}, price=${price}, id_category=${id_category},id_locRak=${id_locRak}  WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM products  WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM products ");
};

const countDataRak = (id_rak) => {
  return Pool.query(`SELECT COUNT(*) FROM products Where id_locrak = ${id_rak}`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM products  WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findCapacity = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT capacity FROM raks  WHERE id=${id}`, (error, result) => {
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
  selectSearchProduct,
  select,
  insert,
  update,
  deleteData,
  countData,
  countDataRak,
  findId,
  findCapacity,
};
