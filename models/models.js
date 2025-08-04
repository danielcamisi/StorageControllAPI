const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  pword: { type: String, required: true },
  email: { type: String, required: true },
});

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  year: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
});

const pecaSchema = new mongoose.Schema({
    pName: { type: String, required: true },
    desc: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
  });

module.exports = mongoose.model("user", userSchema);
module.exports = mongoose.model("user", carSchema);
module.exports = mongoose.model("user", pecaSchema);