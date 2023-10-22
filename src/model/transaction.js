const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT
  transaction.id,
  products.name As name_product,
  transaction.qty,
  transaction.price
FROM transaction
JOIN products
  ON transaction.id_product = products.id 
  where 	products.name    ilike '%${keyword}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchTransaction = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM transaction  where 	name  ilike '%${keyword}%'`);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM transaction  WHERE id='${id}'`);
};
const insert = (data) => {
  const { id, id_product, qty, price } = data;
  return Pool.query(`INSERT INTO transaction (id, id_product, qty, price ) VALUES (${id},${id_product},${qty},${price})`);
};

const update = (data) => {
  const { id, id_product, qty, price } = data;
  return Pool.query(`UPDATE transaction  SET name='${name}', id_product=${id_product}, qty=${qty}, price=${price}  WHERE id=${id}`);
};

const updateProduct = (datas) => {
  const { id_product, quality } = datas;
  return Pool.query(`UPDATE products SET  stock=${quality}  WHERE id='${id_product}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM transaction  WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM transaction ");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM transaction  WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findStock = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT stock FROM products  WHERE id=${id}`, (error, result) => {
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
  selectSearchTransaction,
  select,
  insert,
  update,
  updateProduct,
  deleteData,
  countData,
  findId,
  findStock,
};
