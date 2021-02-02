// pg config
const runQuery = require("../db.js");

const getAllSQL = `
  SELECT *, (SELECT row_to_json(userinfo) FROM
  (
    SELECT *
    FROM users WHERE users.id = orders.user_id
  ) userinfo
) AS user FROM orders`;

const ordersController = {
  getAll: (req, res) => {
    const query = {
      text: getAllSQL,
    };

    db.query(req, res, query, "Fetch all orders");
  },

  getOrderById: (req, res) => {
    const query = {
      text: `${getAllSQL} WHERE orders.id=$1`,
      values: [req.params.orderId],
    };

    db.query(req, res, query, `Fetch order with id: ${req.params.orderId}`);
  },
};

module.exports = ordersController;
