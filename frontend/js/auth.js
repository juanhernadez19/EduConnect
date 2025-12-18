const registerForm = document.getElementById("registerForm");
const errorText = document.getElementById("error");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorText.textContent = "";

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, role }),
      });

    console.log("STATUS:", response.status);
    console.log("CONTENT TYPE:", response.headers.get("content-type"));


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Guardar sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirigir automáticamente
      window.location.href = "feed.html";

    } catch (error) {
      errorText.textContent = error.message;
    }
  });
}
