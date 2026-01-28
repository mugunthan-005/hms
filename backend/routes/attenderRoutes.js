const express = require("express");
const router = express.Router();
const Attender = require("../models/attender");

router.post("/create", async (req, res) => {
  const attenderId = "ATT-" + Date.now();

  const attender = new Attender({
    attenderId,
    name: req.body.name,
    patientName: req.body.patientName,
    relation: req.body.relation
  });

  await attender.save();

  res.json({
    message: "Attender saved",
    attenderId
  });
});

module.exports = router;
