// pg config
const runQuery = require("../db.js");

const getAllSQL = "SELECT id, first_name, last_name, age FROM users";

const usersController = {
  getAll: (req, res) => {
    const query = {
      text: getAllSQL,
    };

    db.query(req, res, query, "Fetch all users");
  },

  getUserById: (req, res) => {
    const query = {
      text: `${getAllSQL} WHERE id=$1`,
      values: [req.params.userId],
    };

    db.query(req, res, query, `Fetch users with id: ${req.params.userId}`);
  },
};

module.exports = usersController;
