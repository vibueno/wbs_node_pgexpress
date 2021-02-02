const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");

module.exports = router;

// '/orders/': returns all orders
router.get("/", ordersController.getAll);
