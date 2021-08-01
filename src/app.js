const express = require("express");
require("dotenv").config();
const db = require("./utils/db");

const app = express();
app.use(express.json());

db.connectToDB();
module.exports = app;