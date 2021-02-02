const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const pool = require("./db.js");
const { PORT } = process.env;

const app = express();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
