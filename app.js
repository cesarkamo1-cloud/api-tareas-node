require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const tareasRoutes = require('./routes/tareasRoutes');
const authRoutes = require('./routes/authRoutes');

app.get('/', (req, res) => {
  res.send('INICIO OK');
});

app.use('/auth', authRoutes);
app.use('/tareas', tareasRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://127.0.0.1:${PORT}`);
});