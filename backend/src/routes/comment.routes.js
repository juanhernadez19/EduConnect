const express = require("express");
const router = express.Router();

const Comment = require("./models/Comment");

/**
 * Crear un comentario
 * POST /api/comments
 */
router.post("/", async (req, res) => {
  try {
    const { content, author, post } = req.body;

    if (!content || !author || !post) {
      return res.status(400).json({
        message: "Contenido, autor y publicación son obligatorios",
      });
    }

    const newComment = new Comment({
      content,
      author,
      post,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear comentario" });
  }
});

/**
 * Obtener comentarios de una publicación
 * GET /api/comments/:postId
 */
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "nombre")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
});

module.exports = router;
