const mongoose = require("mongoose");
const config = require("../config/app");

module.exports = async function () {
  const connection = await mongoose.connect(config.mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  return connection.connection.db;
};




