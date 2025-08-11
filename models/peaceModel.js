const mongoose = require("mongoose");

const peaceSchema = new mongoose.Schema({
    pName: { type: String, required: true },
    desc: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
  });

  module.exports = mongoose.model("user", peaceSchema);