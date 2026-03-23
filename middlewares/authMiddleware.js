require('dotenv').config();

const validarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token requerido' });
    }

    if (token !== process.env.TOKEN_SECRETO) {
        return res.status(403).json({ mensaje: 'Token inválido' });
    }

    next();
};

module.exports = validarToken;