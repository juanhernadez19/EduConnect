const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dominiosPermitidos = ['.edu', '.edu.co'];

exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!dominiosPermitidos.some(d => email.endsWith(d))) {
    return res.status(400).json({ mensaje: 'Correo institucional requerido' });
  }

  const existe = await User.findOne({ email });
  if (existe) {
    return res.status(400).json({ mensaje: 'Usuario ya registrado' });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ nombre, email, password: hash, rol });
  await user.save();

  res.json({ mensaje: 'Usuario registrado correctamente' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ mensaje: 'Credenciales inválidas' });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token, rol: user.rol });
};


