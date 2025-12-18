const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const post = new Post({
    contenido: req.body.contenido,
    categoria: req.body.categoria,
    autor: req.user.id
  });

  await post.save();
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('autor', 'nombre rol')
    .sort({ createdAt: -1 });

  res.json(posts);
};
