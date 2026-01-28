const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Consent = require("../models/consent");

// STORAGE FOR VIDEOS
const storage = multer.diskStorage({
  destination: "backend/uploads/consent-videos",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// POST CONSENT
router.post("/submit", upload.single("consentVideo"), async (req, res) => {
  try {
    const { patientId, latitude, longitude } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const consent = new Consent({
      patientId,
      videoPath: req.file.path,
      latitude,
      longitude
    });

    await consent.save();

    res.json({
      message: "Consent video uploaded successfully"
    });
  } catch (err) {
    console.error("Consent upload error:", err);
    res.status(500).json({
      message: "Consent upload failed",
      error: err.message
    });
  }
});

module.exports = router;
