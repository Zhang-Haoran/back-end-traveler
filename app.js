const cors = require("cors");

const express = require("express");
const loader = require("./src/loaders");
const { connectToDB } = require("./src/loaders/mongoose");
// connectToDB();

const app = express();
loader.init(app);

module.exports = app;
