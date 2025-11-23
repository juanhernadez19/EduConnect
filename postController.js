import Post from "../models/Post.js";

// Crear post
export const createPost = async (req, res) => {
  try {
    const { content, category } = req.body;

    const post = await Post.create({
      author: req.user.id,
      content,
      category
    });

    res.json({ msg: "Publicación creada", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los posts (feed)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener posts por categoría
export const getByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const posts = await Post.find({ category })
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dar o quitar "me gusta"
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post no encontrado" });

    const userId = req.user.id;

    // si ya le dio like → quitarlo
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({ msg: "Like actualizado", likes: post.likes.length });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar post (solo autor o admin)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "No existe" });

    // Permisos
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado" });
    }

    await post.deleteOne();

    res.json({ msg: "Publicación eliminada" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
