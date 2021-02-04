// pg config
const runQuery = require("../db.js");

const buildResponse = require("../response.js");

const getAllSQL = "SELECT id, first_name, last_name, age FROM users";

let response = {};

const usersController = {
  getAll: async (req, res) => {
    try {
      const query = {
        text: getAllSQL,
      };

      const data = await db.query(query);
      res.json(buildResponse(200, "Fetch all users", data.rows));
    } catch (e) {
      if (e.status) {
        return res.status(e.status).json(e);
      } else {
        response = buildResponse(500, "Internal server error", e.message);
        return res.status(response.status).json(response);
      }
    }
  },

  getById: async (req, res) => {
    try {
      const query = {
        text: `${getAllSQL} WHERE id=$1`,
        values: [req.params.id],
      };

      const data = await db.query(query);

      res.json(
        buildResponse(200, `Fetch user with id: ${req.params.id}`, data.rows[0])
      );
    } catch (e) {
      if (e.status) {
        return res.status(e.status).json(e);
      } else {
        response = buildResponse(500, "Internal server error", e.message);
        return res.status(response.status).json(response);
      }
    }
  },

  create: async (req, res) => {
    try {
      const { first_name, last_name } = req.body;
      let { age } = req.body;
      age = parseInt(age);

      if (
        !first_name.trim().length ||
        !last_name.trim().length ||
        !Number.isInteger(age) ||
        age < 0
      ) {
        throw buildResponse(400, "Invalid input data", req.body);
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
      if (e.status) {
        return res.status(e.status).json(e);
      } else {
        response = buildResponse(500, "Internal server error", e.message);
        return res.status(response.status).json(response);
      }
    }
  },
};

module.exports = usersController;
