const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// '/users/': returns all users
router.get("/", usersController.getAll);

// '/users/:id': returns user with id :id
router.get("/:id", usersController.getById);

module.exports = router;
