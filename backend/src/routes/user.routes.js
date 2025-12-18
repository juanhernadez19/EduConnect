const express = require("express");
const router = express.Router();

const {
  getUsers,
  getProfile,
} = require("../controllers/user.controller");

/**
 * Obtener todos los usuarios
 * GET /api/users
 */
router.get("/", getUsers);

/**
 * Obtener perfil del usuario autenticado
 * GET /api/users/profile
 *
 * (Cuando agreguemos auth middleware,
 * esta ruta quedará protegida)
 */
router.get("/profile", getProfile);

module.exports = router;
