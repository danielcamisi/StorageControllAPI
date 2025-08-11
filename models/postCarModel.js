const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  year: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  desc: {type: String, required:true}
});


module.exports = mongoose.model("cars", carSchema);