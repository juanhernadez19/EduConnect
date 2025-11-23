const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const publicacionesRoutes = require("./routes/publicaciones.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a Mongo
mongoose.connect("mongodb://localhost:27017/educonnect")
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log("Error al conectar:", err));

// Rutas
app.use("/api/publicaciones", publicacionesRoutes);

// Servidor
app.listen(5000, () => {
    console.log("Servidor corriendo en puerto 5000");
});
