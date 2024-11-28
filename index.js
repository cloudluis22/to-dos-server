const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 8080;

// Agregamos capacidad de interpretar codigo JSON enviado por el cliente.
app.use(express.json());

// Configuración de la conexión a base de datos MySQL.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'desarrollador',
    password: 'developer123',
    database: 'to dos',
});

// Conectar a BD MySQL.
db.connect((err) => {
    if (err) {
      console.error('Error al conectar a MySQL:', err);
      return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Leer todas las tareas.
app.get('/tareas', (req, res) => {
    db.query('SELECT * FROM tareas', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
});

// Inicialización del servidor.
app.listen(
    PORT,
    () => console.log('Servidor funcionando en localhost puerto ' + PORT)
)
