document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const loginType = document.getElementById("loginType").value;

  // Demo project: accept any email/password
  // Save role for later use
  localStorage.setItem("role", loginType);

  // Redirect based on selection
  if (loginType === "attender") {
    window.location.href = "attender.html";   // patient/attender page
  } else if (loginType === "doctor") {
    window.location.href = "doctor.html";     // doctor/admin page
  } else {
    alert("Select login type");
  }
});
