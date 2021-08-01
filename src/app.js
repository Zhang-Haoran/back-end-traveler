const express = require("express");
require("dotenv").config();
const db = require("./utils/db");
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());
app.use('/api/v1/user', userRouter);

db.connectToDB();
module.exports = app;