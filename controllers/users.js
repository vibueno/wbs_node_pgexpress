// pg config
const runQuery = require("../db.js");

const getAllSQL = "SELECT id, first_name, last_name, age FROM users";

const usersController = {
  getAll: async (req, res) => {
    const query = {
      text: getAllSQL,
    };

    const data = await db.query(query);

    res.json({
      code: 200,
      operation: "success",
      description: "Fetch all users",
      data: data.rows,
    });
  },

  getUserById: async (req, res) => {
    const query = {
      text: `${getAllSQL} WHERE id=$1`,
      values: [req.params.userId],
    };

    const data = await db.query(query);

    res.json({
      code: 200,
      operation: "success",
      description: "Fetch users with id: ${req.params.userId}",
      data: data.rows,
    });
  },
};

module.exports = usersController;
