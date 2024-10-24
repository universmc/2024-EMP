const express = require('express');
const app = express();
const port = 3008;

// Importer les routes à partir de ./routes/index.js
// const routes = require('./routes/assistant');
const routes = require('./routes/index');

// Utiliser le middleware express.static() pour servir les fichiers statiques publics
app.use(express.static('public'));

// Utiliser les routes dans votre application Express
app.use(routes);

app.listen(port, () => console.log(`Server running on port ${port}`));
