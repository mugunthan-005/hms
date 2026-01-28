const patientId = localStorage.getItem("patientId");
document.getElementById("pidText").innerText = patientId || "Missing";

const statusEl = document.getElementById("status");

let latitude = "";
let longitude = "";

navigator.geolocation.getCurrentPosition(
  (pos) => {
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    statusEl.innerText = "Location captured ✅";
  },
  () => {
    statusEl.innerText = "Location blocked ⚠️ (still can record)";
  }
);

const preview = document.getElementById("preview");
const playback = document.getElementById("playback");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const uploadBtn = document.getElementById("uploadBtn");

let stream, recorder, chunks = [], recordedBlob = null;

startBtn.addEventListener("click", async () => {
  if (!patientId) return alert("Patient ID missing. Go back and generate ID first.");

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    preview.srcObject = stream;

    chunks = [];
    recordedBlob = null;

    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

    recorder.onstop = () => {
      recordedBlob = new Blob(chunks, { type: "video/webm" });
      playback.src = URL.createObjectURL(recordedBlob);
      uploadBtn.disabled = false;
      statusEl.innerText = "Recording ready ✅ Click Upload.";
    };

    recorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    statusEl.innerText = "Recording... 🎥";
  } catch (err) {
    alert("Camera/Mic permission denied");
  }
});

stopBtn.addEventListener("click", () => {
  recorder.stop();
  stream.getTracks().forEach(t => t.stop());
  preview.srcObject = null;

  stopBtn.disabled = true;
  startBtn.disabled = false;
});

uploadBtn.addEventListener("click", async () => {
  if (!recordedBlob) return alert("Record video first.");

  statusEl.innerText = "Uploading... ⏳";
  uploadBtn.disabled = true;

  const formData = new FormData();
  formData.append("patientId", patientId);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("consentVideo", recordedBlob, `consent-${Date.now()}.webm`);

  const res = await fetch("http://localhost:5000/api/consent/submit", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    statusEl.innerText = "Upload failed ❌";
    uploadBtn.disabled = false;
    return alert(data.message || "Upload failed");
  }

  statusEl.innerText = "Uploaded ✅";
  alert(data.message || "Consent uploaded");
});
