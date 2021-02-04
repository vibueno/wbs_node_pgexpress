// pg config
const runQuery = require("../db.js");

const buildResponse = require("../response.js");

const getAllSQL = `
  SELECT id, price, date,
  ( SELECT row_to_json(userinfo)
    FROM
      (
        SELECT id, first_name, last_name, age
        FROM users WHERE users.id = orders.user_id
      ) userinfo
) AS user FROM orders`;

let response = {};

const ordersController = {
  getAll: async (req, res) => {
    try {
      const query = {
        text: getAllSQL,
      };

      const data = await db.query(query);

      res.json(buildResponse(200, "Fetch all orders", data.rows));
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
        text: `${getAllSQL} WHERE orders.id=$1`,
        values: [req.params.id],
      };

      const data = await db.query(query);

      res.json(
        buildResponse(
          200,
          `Fetch order with id: ${req.params.id}`,
          data.rows[0]
        )
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
};

module.exports = ordersController;
