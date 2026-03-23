require('dotenv').config();

const login = (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: 'Faltan datos'
    });
  }

  if (
    usuario === process.env.USUARIO_ADMIN &&
    password === process.env.PASSWORD_ADMIN
  ) {
    return res.status(200).json({
      mensaje: 'Acceso permitido',
      token: process.env.TOKEN_SECRETO
    });
  }

  return res.status(401).json({
    mensaje: 'Credenciales incorrectas'
  });
};

module.exports = { login };