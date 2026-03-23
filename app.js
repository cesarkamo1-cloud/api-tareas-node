const express = require('express');
const app = express();

app.use(express.json());

const tareasRoutes = require('./routes/tareasRoutes');

app.get('/', (req, res) => {
  res.send('INICIO OK');
});

app.use('/tareas', tareasRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Usar variable de entorno o puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://127.0.0.1:${PORT}`);
});
