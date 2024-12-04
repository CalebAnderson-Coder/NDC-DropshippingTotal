const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Puerto en el que se ejecutará el servidor
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
