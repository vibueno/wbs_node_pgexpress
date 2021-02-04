// pg config
const runQuery = require("../db.js");

const getAllSQL = `
  SELECT id, price, date,
  ( SELECT row_to_json(userinfo)
    FROM
      (
        SELECT id, first_name, last_name, age
        FROM users WHERE users.id = orders.user_id
      ) userinfo
) AS user FROM orders`;

const ordersController = {
  getAll: async (req, res) => {
    const query = {
      text: getAllSQL,
    };

    try {
      const data = await db.query(query);

      res.json({
        code: 200,
        operation: "success",
        description: "Fetch all orders",
        data: data.rows,
      });
    } catch {
      return res.sendStatus(500);
    }
  },

  getById: async (req, res) => {
    const query = {
      text: `${getAllSQL} WHERE orders.id=$1`,
      values: [req.params.id],
    };
    try {
      const data = await db.query(query);

      res.json({
        code: 200,
        operation: "success",
        description: `Fetch order with id: ${req.params.id}`,
        data: data.rows[0],
      });
    } catch {
      return res.sendStatus(500);
    }
  },
};

module.exports = ordersController;
