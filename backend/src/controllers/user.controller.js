const User = require("./models/user");

/**
 * Obtener todos los usuarios (para admin o pruebas)
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

module.exports = {
  getUsers,
  getProfile,
};
