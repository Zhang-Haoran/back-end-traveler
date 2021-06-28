const cors = require("cors");
const express = require("express");
const loader = require("./src/loaders");
// const { connectToDB } = require("./src/loaders/mongoose");
// // //  连接数据库 监听 也可以放在最外面
// connectToDB();
const app = express();
loader.init(app);

module.exports = app;
