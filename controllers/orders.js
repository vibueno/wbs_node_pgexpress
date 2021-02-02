// pg config
const pool = require("../db.js");

const runQuery = async (req, res, query) => {
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
};

const ordersController = {
  getAll: (req, res) => {
    res.end("returning all orders");
  },

  getOrderById: (req, res) => {
    res.end(`returning order with id ${req.params.orderId}`);
  },
};

module.exports = ordersController;
