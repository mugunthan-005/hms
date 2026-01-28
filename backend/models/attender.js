const mongoose = require("mongoose");

const attenderSchema = new mongoose.Schema({
  attenderId: { type: String, unique: true },
  name: String,
  patientName: String,
  relation: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attender", attenderSchema);
