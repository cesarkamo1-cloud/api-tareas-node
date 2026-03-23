const express = require('express');
const router = express.Router();

const { login } = require('../controllers/authController');
const validarToken = require('../middlewares/authMiddleware');

router.post('/login', login);

// RUTA PROTEGIDA
router.get('/perfil', validarToken, (req, res) => {
    res.json({ mensaje: 'Acceso a perfil permitido 🔐' });
});

module.exports = router;