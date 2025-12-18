const express = require('express');
const { createPost, getPosts } = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);

module.exports = router;
