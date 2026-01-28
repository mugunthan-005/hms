document.getElementById("patientForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const res = await fetch("http://localhost:5000/api/patient/create", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  console.log("PATIENT CREATE RESPONSE:", data);


  // 🔴 VERY IMPORTANT (DO NOT SKIP)
  localStorage.setItem("patientId", data.patientId);
  alert("Patient ID generated: " + data.patientId);

  // 🔴 GO TO CONSENT PAGE
  window.location.href = "consent.html";
});
