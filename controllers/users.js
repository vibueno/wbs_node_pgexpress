// pg config
const pool = require("../db.js");

const runQuery = async (req, res, query) => {
  try {
    const data = await pool.query(query);
    res.json({
      code: 200,
      operation: "success",
      description: `Fetch all users`,
      data: data.rows,
    });
  } catch (err) {
    console.error("Error executing query", err);
  }
};

const usersController = {
  getAll: (req, res) => {
    const query = {
      text: "SELECT * FROM users",
    };

    runQuery(req, res, query);
  },

  getUserById: (req, res) => {
    const query = {
      text: "SELECT * FROM users where id=$1",
      values: [req.params.userId],
    };

    runQuery(req, res, query);
  },
};

module.exports = usersController;
