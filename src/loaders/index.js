const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

exports.init = (expressApp) => {
  // eslint-disable-next-line no-unused-vars
  const mongoConnection = mongooseLoader();
  expressLoader(expressApp);
};
