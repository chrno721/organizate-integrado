const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Base de datos en memoria para tareas
let tareasDB = [
    { id_tarea: 1, titulo: 'Estudiar React', descripcion: 'Completar el módulo' },
    { id_tarea: 2, titulo: 'Hacer ejercicio', descripcion: 'Rutina diaria' },
    { id_tarea: 3, titulo: 'Revisar correos', descripcion: 'Responder emails' }
];

let ultimoId = 3;

// Ruta principal
app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando' });
});

// Ruta LOGIN
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log('Login intento:', email);
    
    if (email === 'cristian@organizate.com' && password === '123456') {
        return res.json({
            success: true,
            mensaje: '✅ Autenticación satisfactoria',
            token: 'token_de_prueba_123',
            usuario: { id: 1, nombre: 'Cristian', email: email }
        });
    }
    
    return res.status(401).json({
        success: false,
        mensaje: '❌ Error en la autenticación'
    });
});

// LISTAR TAREAS
app.get('/api/tareas', (req, res) => {
    console.log('Listando tareas:', tareasDB);
    res.json({ tareas: tareasDB });
});

// CREAR TAREA
app.post('/api/tareas', (req, res) => {
    const { titulo, descripcion } = req.body;
    
    console.log('Creando tarea:', titulo, descripcion);
    
    ultimoId++;
    const nuevaTarea = {
        id_tarea: ultimoId,
        titulo: titulo,
        descripcion: descripcion || ''
    };
    
    tareasDB.push(nuevaTarea);
    console.log('Tareas actuales:', tareasDB);
    
    res.status(201).json({ 
        success: true, 
        mensaje: '✅ Tarea creada',
        tarea: nuevaTarea 
    });
});

// ELIMINAR TAREA
app.delete('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('Eliminando tarea:', id);
    
    const tareaExistente = tareasDB.find(t => t.id_tarea === id);
    if (!tareaExistente) {
        return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    
    tareasDB = tareasDB.filter(t => t.id_tarea !== id);
    console.log('Tareas restantes:', tareasDB);
    
    res.json({ success: true, mensaje: '✅ Tarea eliminada' });
});

app.listen(PORT, () => {
    console.log('========================================');
    console.log('🚀 Servidor funcionando');
    console.log(`📡 http://localhost:${PORT}`);
    console.log('========================================');
});