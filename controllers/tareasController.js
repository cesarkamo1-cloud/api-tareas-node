const tareas = [
  { id: 1, titulo: 'Estudiar programación', estado: 'pendiente' },
  { id: 2, titulo: 'Hacer ejercicio', estado: 'completada' }
];

const obtenerTareas = (req, res) => {
  res.json(tareas);
};

const obtenerTareaPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  res.json(tarea);
};

const crearTarea = (req, res) => {
  const { titulo, estado } = req.body;

  // Generar ID basado en el último ID existente para evitar duplicados
  const nuevoId = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1;

  const nuevaTarea = {
    id: nuevoId,
    titulo,
    estado
  };

  tareas.push(nuevaTarea);

  res.status(201).json({
    mensaje: 'Tarea creada correctamente',
    tarea: nuevaTarea
  });
};

const actualizarTarea = (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, estado } = req.body;

  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  tarea.titulo = titulo || tarea.titulo;
  tarea.estado = estado || tarea.estado;

  res.json({
    mensaje: 'Tarea actualizada correctamente',
    tarea
  });
};

const eliminarTarea = (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tareas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  const tareaEliminada = tareas.splice(indice, 1);

  res.json({
    mensaje: 'Tarea eliminada correctamente',
    tarea: tareaEliminada[0]
  });
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};