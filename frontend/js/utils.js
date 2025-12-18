function getToken() {
  return localStorage.getItem("token");
}

function isAuthenticated() {
  return !!getToken();
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
