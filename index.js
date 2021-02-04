// Dotenv config

const dotenv = require("dotenv");
dotenv.config();

// Express config

const { PORT } = process.env;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);

//Start server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
