const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
