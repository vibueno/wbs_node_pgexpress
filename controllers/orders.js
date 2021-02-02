// pg config
const runQuery = require("../db.js");

const ordersController = {
  getAll: (req, res) => {
    const query = {
      text: "SELECT * FROM orders",
    };

    runQuery(req, res, query, "Fetch all orders");
  },

  getOrderById: (req, res) => {
    const query = {
      text: "SELECT * FROM orders where id=$1",
      values: [req.params.orderId],
    };

    runQuery(req, res, query, `Fetch order with id: ${req.params.orderId}`);
  },
};

module.exports = ordersController;
