const mongoose = require("mongoose");
const config = require("../config/app");

exports.connectToDB = () =>{
  const db = mongoose.connection;
  db.on("connected", () => {
      console.log("Connected");
  });
  db.on("error", (error) => {
      console.log('DB connection failed');
      console.log(error.message);
      process.exit(1);
  });
  db.on("disconnected", () => {
      console.log("disconnected");
  });
}
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

exports.disconnectDB = async () => {
  return mongoose.disconnect();
};





