const mongoose = require("mongoose");

const peaceSchema = new mongoose.Schema({
   announceName: { type: String, required: true },
    year: { type: String, required: false }, // Adicione este campo
    desc: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

  module.exports = mongoose.model("peace", peaceSchema);