const path = require("path");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const patientRoutes = require("./routes/patient.routes");
const consentRoutes = require("./routes/consent.routes");
const viewRoutes = require("./routes/view.routes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Serve uploads folder (backend/uploads/...)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.use("/api/patient", patientRoutes);
app.use("/api/consent", consentRoutes);
app.use("/api/view", viewRoutes);

// ✅ Explicit pages (so it never says file not found)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

app.listen(5000, () => console.log("Server running on port 5000"));
