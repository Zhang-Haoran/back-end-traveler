const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

exports.init = (expressApp) => {
  const mongoConnection = mongooseLoader();
  mongooseLoader();
  expressLoader(expressApp);
};
