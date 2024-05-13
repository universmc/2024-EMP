const express = require('express');
const router = express.Router();
const groqHandler = require('../src/groq');

// Traiter les requêtes POST pour le chemin /groq
router.post('/groq', async (req, res) => {
  try {
    // Obtenez le message envoyé par le client
const message = JSON.parse(req.body).message;

// Traiter les requêtes POST pour le chemin /groq
router.post('/groq', async (req, res) => {
  try {
    const message = JSON.parse(req.body).message;
    const chatCompletion = await groqHandler(message);
    res.status(200).json(chatCompletion);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
});


    // Envoyez la réponse sous forme de JSON
res.status(200).json(chatCompletion);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
});

module.exports = router;
