const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getItems = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM items", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.stringify(results.rows));
    });
  });
};

module.exports = {
  getItems,
};
