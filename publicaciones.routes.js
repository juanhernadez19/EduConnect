const express = require("express");
const router = express.Router();

const {
    crearPublicacion,
    obtenerPublicaciones,
    darLike
} = require("../controllers/publicaciones.controller");

router.post("/", crearPublicacion);
router.get("/", obtenerPublicaciones);
router.put("/like/:id", darLike);

module.exports = router;
