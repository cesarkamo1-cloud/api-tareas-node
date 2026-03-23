const express = require('express');
// Creamos un "mini-router" para manejar solo las rutas de tareas de forma ordenada
const router = express.Router();

// Importamos las funciones que creamos en el controlador (la lógica)
// para usarlas aquí cuando alguien visite una ruta.
const {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} = require('../controllers/tareasController');

// Definimos las rutas. Fíjate que ya no ponemos '/tareas' aquí,
// porque eso ya lo definimos en app.js. Aquí solo ponemos lo que sigue.

router.get('/', obtenerTareas);          // GET /tareas -> Ver todas
router.get('/:id', obtenerTareaPorId);   // GET /tareas/1 -> Ver una específica
router.post('/', crearTarea);            // POST /tareas -> Crear una nueva
router.put('/:id', actualizarTarea);     // PUT /tareas/1 -> Editar una existente
router.delete('/:id', eliminarTarea);    // DELETE /tareas/1 -> Borrar una

// Exportamos este router para que app.js lo pueda usar
module.exports = router;