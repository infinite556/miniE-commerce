const dotenv = require("dotenv").config({ path: "./config.env" });
const express = require("express");
exports.app = express;

app.use(express.json());
