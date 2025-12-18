const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const router = express.Router(); 

router.post("/register", async (req, res) => {
    res.json({ message: "Ruta register OK" });
  const { nombre, email, password, role } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    nombre,
    email,
    password: hashedPassword,
    role,
  });

  await user.save();

  res.status(201).json({ message: "Usuario creado correctamente" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  const userExists = await User.findOne({ email });
if (userExists) {
  return res.status(400).json({
    message: "El correo ya está registrado"
  });
}


  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secreto",
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = router; 
