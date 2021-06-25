const cors = require("cors");

const express = require("express");
const loader = require("./src/loaders");
const { connectToDB } = require("./src/loaders/mongoose");
// //  连接数据库 监听 可以放在src的index里面 也可以放在项目文件夹最外面与src平行存为index.js
connectToDB();

const app = express();
loader.init(app);

module.exports = app;
