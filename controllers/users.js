// pg config
const runQuery = require("../db.js");

const usersController = {
  getAll: (req, res) => {
    const query = {
      text: "SELECT * FROM users",
    };

    runQuery(req, res, query, "Fetch all users");
  },

  getUserById: (req, res) => {
    const query = {
      text: "SELECT * FROM users where id=$1",
      values: [req.params.userId],
    };

    runQuery(req, res, query, `Fetch users with id: ${req.params.userId}`);
  },
};

module.exports = usersController;
