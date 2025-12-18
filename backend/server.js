const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");

const app = express();
connectDB();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Servidor EduConnect funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
