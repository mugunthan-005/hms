document.getElementById("patientForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("status");
  if (status) {
    status.style.display = "inline-block";
    status.innerText = "Submitting...";
  }

  const formData = new FormData(e.target);

  const res = await fetch("http://localhost:5000/api/patient/create", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  console.log("STATUS:", res.status);
  console.log("DATA:", data);

  const age = Number(formData.get("patientAge"));
if (!Number.isFinite(age)) {
  alert("Please enter a valid numeric age");
  return;
}
formData.set("patientAge", age);

  console.log("PATIENT CREATE RESPONSE:", data);

  const pid = data.patientId || data.id || data.patient?.patientId;
  if (!res.ok || !pid) {
    if (status) status.innerText = "Failed";
    alert(data.message || "Patient creation failed");
    return;
  }

  alert("Patient ID generated: " + pid);

  localStorage.setItem("patientId", pid);

  if (status) status.innerText = "Redirecting...";
  window.location.href = "consent.html";
});
