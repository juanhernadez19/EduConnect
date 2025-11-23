import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  getByCategory,
  toggleLike,
  deletePost
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", authRequired, createPost);

router.get("/", authRequired, getPosts);

router.get("/categoria/:category", authRequired, getByCategory);

router.put("/like/:id", authRequired, toggleLike);

router.delete("/:id", authRequired, deletePost);

export default router;
