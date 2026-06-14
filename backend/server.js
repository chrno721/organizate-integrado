const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando' });
});

// Ruta LOGIN
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log('Email:', email);
    console.log('Password:', password);
    
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

// Ruta LISTAR TAREAS
app.get('/api/tareas', (req, res) => {
    res.json({
        tareas: [
            { id_tarea: 1, titulo: 'Estudiar React', descripcion: 'Completar el módulo', estado: 'Pendiente' },
            { id_tarea: 2, titulo: 'Hacer ejercicio', descripcion: 'Rutina diaria', estado: 'En Progreso' },
            { id_tarea: 3, titulo: 'Revisar correos', descripcion: 'Responder emails', estado: 'Completada' }
        ]
    });
});

// Ruta CREAR TAREA
app.post('/api/tareas', (req, res) => {
    const { titulo, descripcion } = req.body;
    console.log('Creando tarea:', titulo, descripcion);
    res.status(201).json({
        success: true,
        mensaje: '✅ Tarea creada',
        tarea: { id_tarea: Date.now(), titulo, descripcion }
    });
});

// Ruta ELIMINAR TAREA
app.delete('/api/tareas/:id', (req, res) => {
    console.log('Eliminando tarea:', req.params.id);
    res.json({ success: true, mensaje: '✅ Tarea eliminada' });
});

app.listen(PORT, () => {
    console.log('========================================');
    console.log('🚀 Servidor funcionando');
    console.log(`📡 http://localhost:${PORT}`);
    console.log('========================================');
});