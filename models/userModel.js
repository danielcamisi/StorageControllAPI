const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nUser: { type: String, required: true },
  pword: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("jdm-users", userSchema);