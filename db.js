const { Pool } = require("pg");
const { DBUSER, DBHOST, DBNAME, DBPASS, DBPORT } = process.env;

const pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
  port: DBPORT,
});

const query = async (req, res, query, description) => {
  try {
    const data = await pool.query(query);
    res.json({
      code: 200,
      operation: "success",
      description: description,
      data: data.rows,
    });
  } catch (err) {
    console.error("Error executing query", err);
  }
};

db = { query };

module.exports = db;
