const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
//write code here

module.exports = router;

// '/users/': returns all users
router.get("/", usersController.getAll);
