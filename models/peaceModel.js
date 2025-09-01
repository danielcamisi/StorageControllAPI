const mongoose = require("mongoose");

const peaceSchema = new mongoose.Schema({
    announceName: { type: String, required: true },
    desc: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    img: {type: String, required:true},
  });

  module.exports = mongoose.model("peace", peaceSchema);