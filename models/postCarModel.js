const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  announceName: { type: String, required: true },
  year: { type: String, required: true },
  details: { type: String },
  price: { type: Number, required: true },
  desc: {type: String, required:true},
  img: {type: String, required:true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


module.exports = mongoose.model("cars", carSchema);