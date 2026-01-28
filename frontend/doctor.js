const token = localStorage.getItem("token");
if (!token) {
  alert("Please login again");
  window.location.href = "login.html";
}

const role = localStorage.getItem("role");
if (role !== "doctor" && role !== "admin") {
  alert("Access denied");
  window.location.href = "login.html";
}

document.getElementById("searchBtn").addEventListener("click", async () => {
  const patientId = document.getElementById("pid").value.trim();
  const out = document.getElementById("out");
  out.textContent = "Loading...";


  const res = await fetch(`http://localhost:5000/api/view/${patientId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) return (out.textContent = data.message || "Error");

  const p = data.patient;
  const c = data.consent;

  // Convert "backend/uploads/..." to "/uploads/..."
  const idProofUrl = p.idProofPath
    ? `http://localhost:5000/${p.idProofPath.replace("backend/", "")}`
    : "";

  let consentBlock = `<p><b>Consent:</b> Not uploaded yet</p>`;
  if (c?.videoPath) {
   const videoUrl = `http://localhost:5000/${c.videoPath.replace("backend/", "")}`;

    consentBlock = `
      <h3>Consent</h3>
      <p><b>Time:</b> ${new Date(c.consentedAt).toLocaleString()}</p>
      <p><b>Location:</b> ${c.latitude}, ${c.longitude}</p>
      <video controls width="360">
        <source src="${videoUrl}">
      </video>
    `;
  }

  out.innerHTML = `
    <h3>Patient</h3>
    <p><b>ID:</b> ${p.patientId}</p>
    <p><b>Name:</b> ${p.patientName}</p>
    <p><b>Age:</b> ${p.patientAge}</p>
    <p><b>Gender:</b> ${p.patientGender}</p>

    <h3>Attender</h3>
    <p><b>Name:</b> ${p.attenderName}</p>
    <p><b>Relation:</b> ${p.attenderRelation}</p>

    <h3>ID Proof</h3>
    ${idProofUrl ? `<img src="${idProofUrl}" width="260" />` : "<p>Not uploaded</p>"}

    ${consentBlock}
  `;
});
