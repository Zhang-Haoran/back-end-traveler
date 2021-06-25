const express = require("express");
const cors = require("cors");
const apiRouter = require("../../src/routes/v1/api");
const userRouter = require("../../src/routes/v1/users");
const config = require("../../src/config/app");

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, apiRouter);
  app.use(config.api.prefix, userRouter);
  return app;
};
