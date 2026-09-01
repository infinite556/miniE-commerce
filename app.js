const dotenv = require("dotenv").config({ path: "./config.env" });
const express = require("express");

const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");

const app = express();
app.use(express.json());

app.use("/api/v1/", authRouter);
app.use("/api/v1/", productRouter);

module.exports = {
  app,
};
