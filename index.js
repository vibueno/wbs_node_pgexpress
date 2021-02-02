// Dotenv config

const dotenv = require("dotenv");
dotenv.config();

// Express config

const { PORT } = process.env;
const express = require("express");
const app = express();

const usersRoutes = require("./routes/users");

app.use("/users", usersRoutes);

//Start server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
