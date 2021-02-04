// pg config
const runQuery = require("../db.js");

const buildResponse = require("../error.js");

const getAllSQL = "SELECT id, first_name, last_name, age FROM users";

const usersController = {
  getAll: async (req, res) => {
    const query = {
      text: getAllSQL,
    };
    try {
      const data = await db.query(query);

      res.json({
        code: 200,
        operation: "success",
        description: "Fetch all users",
        data: data.rows,
      });
    } catch {
      return res.sendStatus(500);
    }
  },

  getById: async (req, res) => {
    const query = {
      text: `${getAllSQL} WHERE id=$1`,
      values: [req.params.id],
    };
    try {
      const data = await db.query(query);

      res.json({
        code: 200,
        operation: "success",
        description: `Fetch user with id: ${req.params.id}`,
        data: data.rows[0],
      });
    } catch {
      return res.sendStatus(500);
    }
  },

  create: async (req, res) => {
    let response = {};

    try {
      const { first_name, last_name, age } = req.body;

      if (
        !first_name.trim().length ||
        !last_name.trim().length ||
        !Number.isInteger(age) ||
        age < 0
      ) {
        response = buildResponse(400, "Invalid input data", req.body);
        throw new Error("Invalid input data");
      }

      const query = {
        text:
          "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *;",
        values: [req.body.first_name, req.body.last_name, req.body.age],
      };

      const data = await db.query(query);

      response = buildResponse(200, "Inserted user", data.rows[0]);

      res.status(response.status).json(response);
    } catch (e) {
      if (response.status) {
        return res.status(response.status).json(response);
      } else {
        response = buildResponse(500, "Internal server error", e.message);

        return res.status(response.status).json(response);
      }
    }
  },
};

module.exports = usersController;
