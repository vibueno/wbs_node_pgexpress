// pg config
const runQuery = require("../db.js");

const getAllSQL = `
  SELECT id, price, date, (SELECT row_to_json(userinfo) FROM
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

    const data = await db.query(query);

    res.json({
      code: 200,
      operation: "success",
      description: "Fetch all orders",
      data: data.rows,
    });
  },

  getOrderById: async (req, res) => {
    const query = {
      text: `${getAllSQL} WHERE orders.id=$1`,
      values: [req.params.orderId],
    };

    const data = await db.query(query);

    res.json({
      code: 200,
      operation: "success",
      description: `Fetch order with id: ${req.params.orderId}`,
      data: data.rows,
    });

    db.query(query);
  },
};

module.exports = ordersController;
