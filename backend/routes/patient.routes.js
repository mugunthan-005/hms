const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Patient = require("../models/Patient");

// STORAGE
const storage = multer.diskStorage({
  destination: "backend/uploads/id-proofs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE PATIENT
router.post("/create", upload.single("idProof"), async (req, res) => {
  try {
    const patientId = "HMS-" + Date.now();

    const patient = new Patient({
      patientId,
      patientName: req.body.patientName,
      patientAge: req.body.patientAge,
      patientGender: req.body.patientGender,
      attenderName: req.body.attenderName,
      attenderRelation: req.body.attenderRelation,
      idProofPath: req.file.path
    });

    await patient.save();

    res.json({
      message: "Patient registered",
      patientId
    });
  } catch (err) {
    console.error("Patient creation error:", err);
    res.status(500).json({
      message: "Patient creation failed",
      error: err.message
    });
  }
});

module.exports = router;
