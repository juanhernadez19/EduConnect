const Publicacion = require("../models/Publicacion");

// Crear publicación
exports.crearPublicacion = async (req, res) => {
    try {
        const { content, category } = req.body;

        const nueva = new Publicacion({
            content,
            category
        });

        await nueva.save();

        res.json({ mensaje: "Publicación creada", publicacion: nueva });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al crear publicación" });
    }
};

// Obtener todas las publicaciones
exports.obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find().sort({ createdAt: -1 });
        res.json(publicaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener publicaciones" });
    }
};

// Dar / quitar like
exports.darLike = async (req, res) => {
    try {
        const { id } = req.params;

        const pub = await Publicacion.findById(id);

        if (!pub)
            return res.status(404).json({ mensaje: "Publicación no encontrada" });

        // Esto está sin autenticación, así que simulamos un usuario:
        const userId = "672f19a1a2f4e3f1d12e9876"; // ID falso

        const index = pub.likes.indexOf(userId);

        if (index === -1) {
            pub.likes.push(userId);
        } else {
            pub.likes.splice(index, 1);
        }

        await pub.save();

        res.json({ mensaje: "Like actualizado", likes: pub.likes.length });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al dar like" });
    }
};
