const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");

// '/orders/': returns all orders
router.get("/", ordersController.getAll);

// '/orders/:id': returns order with id :id
router.get("/:id", ordersController.getById);

module.exports = router;
