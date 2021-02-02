const { Pool } = require("pg");
const { DBUSER, DBHOST, DBNAME, DBPASS, DBPORT } = process.env;

const pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
  port: DBPORT,
});

const query = async (query) => {
  try {
    const data = await pool.query(query);
    return data;
  } catch (err) {
    console.error("Error executing query", err);
  }
};

db = { query };

module.exports = db;
