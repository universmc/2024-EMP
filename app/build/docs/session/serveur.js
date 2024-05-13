// Importations nécessaires
const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const readline = require('readline');
const Groq = require('groq-sdk');

// Initialisation de l'application Express
const expressApp = express();

// Configuration de Swagger pour la documentation de l'API
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'univers-mc.cloud API',
            version: '1.0.0',
            description: 'The API for univers-mc.cloud',
        },
        servers: [
            {
                url: 'http://localhost:3010',
                description: 'Local server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Indiquez ici le chemin de vos fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serveur la documentation de l'API via Swagger UI
expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routage pour les fichiers JSON
expressApp.get('/json/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'json', `${filename}.json`));
});

// Servir les fichiers statiques, par exemple ceux de l'interface utilisateur React
expressApp.use(express.static(path.join(__dirname, '../frontend/ux')));

// Port sur lequel le serveur Express écoutera
const PORT = 3144;

// Fonction pour créer la fenêtre principale d'Electron
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Charge l'URL du serveur Express dans la fenêtre d'Electron
    mainWindow.loadURL(`http://localhost:${PORT}`);
}

// Cette fonction sera appelée quand Electron aura fini de s'initialiser
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quitte l'application quand toutes les fenêtres sont fermées, sauf sur macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Initialisation de l'interface de ligne de commande avec readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialisation du client Groq SDK
const groq = new Groq();

// La fonction principale pour la logique de l'application CLI pourrait aller ici
// ...

// Démarrage du serveur Express
expressApp.listen(PORT, () => {
    console.log(`Serveur Express fonctionnant sur le port ${PORT}`);
});
