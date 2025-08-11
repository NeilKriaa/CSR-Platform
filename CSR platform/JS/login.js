document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;

  // 👉 Simulation des rôles
  const users = {
    "admin@coficab.com": "admin",
    "user@coficab.com": "user"
  };

  if (users[email]) {
    sessionStorage.setItem("role", users[email]);

    if (users[email] === "admin") {
      window.location.href = "home_admin.html";
    } else {
      // Pour les utilisateurs : redirection vers la page intermédiaire
      window.location.href = "user_info.html";
    }

  } else {
    document.getElementById("error").innerText = "Invalid email or password.";
  }
});
