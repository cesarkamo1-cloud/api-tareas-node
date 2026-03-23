// Esta es nuestra "base de datos" temporal (vive en la memoria RAM).
// Si reinicias el servidor, vuelve a este estado original.
const tareas = [
  { id: 1, titulo: 'Estudiar programación', estado: 'pendiente' },
  { id: 2, titulo: 'Hacer ejercicio', estado: 'completada' }
];

// Función para VER todas las tareas
const obtenerTareas = (req, res) => {
  // Simplemente respondemos enviando todo el array de tareas en formato JSON
  res.json(tareas);
};

// Función para buscar UNA sola tarea por su ID
const obtenerTareaPorId = (req, res) => {
  // Convertimos el id que viene en la URL (que es texto) a número entero
  const id = parseInt(req.params.id);
  // Buscamos dentro del array la tarea que tenga ese mismo ID
  const tarea = tareas.find(t => t.id === id);

  // Si no la encontramos (es undefined), devolvemos un error 404 y cortamos aquí
  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  // Si la encontramos, la enviamos
  res.json(tarea);
};

// Función para CREAR una nueva tarea
const crearTarea = (req, res) => {
  // Sacamos el titulo y el estado de lo que nos envió el usuario (el body)
  const { titulo, estado } = req.body;

  // Truco matemático: Buscamos el ID más alto que existe y le sumamos 1.
  // Así aseguramos que el nuevo ID no esté repetido.
  const nuevoId = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1;

  // Creamos el objeto de la nueva tarea
  const nuevaTarea = {
    id: nuevoId,
    titulo,
    estado
  };

  // La metemos en nuestro array (base de datos)
  tareas.push(nuevaTarea);

  // Respondemos con código 201 (significa "Creado con éxito") y mostramos lo que creamos
  res.status(201).json({
    mensaje: 'Tarea creada correctamente',
    tarea: nuevaTarea
  });
};

// Función para ACTUALIZAR (editar) una tarea existente
const actualizarTarea = (req, res) => {
  // Obtenemos el ID de la URL y los datos nuevos del cuerpo de la petición
  const id = parseInt(req.params.id);
  const { titulo, estado } = req.body;

  // Buscamos la tarea original
  const tarea = tareas.find(t => t.id === id);

  // Si no existe, error 404
  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  // Aquí actualizamos: Si nos enviaron un título nuevo, lo usamos.
  // Si no nos enviaron nada (es undefined), dejamos el título que ya tenía.
  tarea.titulo = titulo || tarea.titulo;
  tarea.estado = estado || tarea.estado;

  // Devolvemos la tarea ya con los cambios hechos
  res.json({
    mensaje: 'Tarea actualizada correctamente',
    tarea
  });
};

// Función para BORRAR una tarea
const eliminarTarea = (req, res) => {
  const id = parseInt(req.params.id);
  // Buscamos en qué posición del array está esa tarea (índice)
  const indice = tareas.findIndex(t => t.id === id);

  // Si findIndex devuelve -1, significa que no la encontró
  if (indice === -1) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  // Usamos .splice para "cortar" 1 elemento en esa posición (borrarlo del array original)
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