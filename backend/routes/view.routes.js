const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");
const Consent = require("../models/consent");

router.get("/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const patient = await Patient.findOne({ patientId });
    const consent = await Consent.findOne({ patientId });

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({ patient, consent });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
});

module.exports = router;
