const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./utils/db");
const app = express();
app.use(express.json());

db.connectToDB();
module.exports = app;