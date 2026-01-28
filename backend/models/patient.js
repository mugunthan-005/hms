const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true },
  patientName: String,
  patientAge: Number,
  patientGender: String,
  attenderName: String,
  attenderRelation: String,
  idProofPath: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
