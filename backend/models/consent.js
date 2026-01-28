const mongoose = require("mongoose");

const consentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },

  videoPath: {
    type: String,
    required: true
  },

  latitude: {
    type: Number
  },

  longitude: {
    type: Number
  },

  consentedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Consent", consentSchema);
