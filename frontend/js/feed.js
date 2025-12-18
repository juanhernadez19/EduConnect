const API_URL = 'http://localhost:3000/api/feed';

const form = document.getElementById('form-publicacion');
const contenidoInput = document.getElementById('contenido');
const feedDiv = document.getElementById('feed');

// Obtener publicaciones
async function cargarPublicaciones() {
  const res = await fetch(API_URL);
  const data = await res.json();

  feedDiv.innerHTML = '';

  data.forEach(pub => {
    const p = document.createElement('p');
    p.textContent = pub.contenido;
    feedDiv.appendChild(p);
  });
}

// Enviar publicación
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const contenido = contenidoInput.value;

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ contenido })
  });

  contenidoInput.value = '';
  cargarPublicaciones();
});

// Cargar al iniciar
cargarPublicaciones();

// Verificar sesión
if (!isAuthenticated()) {
  window.location.href = "login.html";
}

