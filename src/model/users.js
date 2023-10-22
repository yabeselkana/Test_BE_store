const Pool = require("../config/db");

const cerate = (data) => {
  const { id, fullname, email, phone, passwordHash } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users (id, email,password,fullname,phone) VALUES('${id}','${email}','${passwordHash}','${fullname}','${phone}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email = '${email}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  cerate,
  findEmail,
};
