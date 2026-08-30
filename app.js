const dotenv = require("dotenv").config({ path: "./config.env" });
const express = require("express");

const authRouter = require("./routes/auth.route");

const app = express();
app.use(express.json());

app.use("/api/v1/", authRouter);

module.exports = {
  app,
};
