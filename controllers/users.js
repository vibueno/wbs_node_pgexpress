// pg config
const pool = require("../db.js");

const usersController = {
  getAll: async (req, res) => {
    const query = {
      text: "SELECT * FROM users",
    };

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
  },

  getUserById: (req, res) => {
    res.end(`Returning user with id ${req.params.userId}`);
  },
};

module.exports = usersController;
