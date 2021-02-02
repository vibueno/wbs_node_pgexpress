const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

module.exports = router;

// '/users/': returns all users
router.get("/", usersController.getAll);

// '/users/:userId': returns user with id userId
router.get("/:userId", usersController.getUserById);
