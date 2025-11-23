// URL del backend
const API_URL = "http://localhost:5000/api/publicaciones";

// =======================
// 1. Crear publicación
// =======================

document.getElementById("form-publicacion").addEventListener("submit", async (e) => {
    e.preventDefault();

    const contenido = document.getElementById("contenido").value;
    const categoria = document.getElementById("categoria").value;

    if (!contenido || !categoria) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const data = {
        content: contenido,
        category: categoria
    };

    try {
        const resp = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // si tienes login, aquí iría el token:
                // "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        });

        const json = await resp.json();
        console.log(json);

        document.getElementById("form-publicacion").reset();

        obtenerPublicaciones();

    } catch (error) {
        console.error("Error al crear publicación:", error);
    }
});

// =======================
// 2. Obtener publicaciones
// =======================

async function obtenerPublicaciones() {
    try {
        const resp = await fetch(API_URL);
        const publicaciones = await resp.json();

        const feed = document.getElementById("feed");
        feed.innerHTML = ""; // limpiar feed antes de renderizar

        publicaciones.forEach(pub => {
            feed.innerHTML += `
                <div class="post">
                    <p><strong>Categoría:</strong> ${pub.category}</p>
                    <p>${pub.content}</p>

                    <button onclick="likePost('${pub._id}')">
                        ❤️ ${pub.likes ? pub.likes.length : 0}
                    </button>

                    <hr>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
    }
}

// =======================
// 3. Dar "me gusta"
// =======================

async function likePost(id) {
    try {
        await fetch(`${API_URL}/like/${id}`, {
            method: "PUT",
            headers: {
                // si tienes auth:
                // "x-access-token": localStorage.getItem("token")
            }
        });

        obtenerPublicaciones();

    } catch (error) {
        console.error("Error al dar like:", error);
    }
}

// Cargar publicaciones al iniciar
obtenerPublicaciones();
