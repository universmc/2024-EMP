const express = require('express');
const router = express.Router();

const Groq = require('groq-sdk');
const groq = new Groq();

router.get('/groq', async (req, res) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: '*💡* Idée géniale** 💻 : tu es une IA de Haut Potentiel au capacité apprentissage automatique grace au neural _Net_ /work pytorch, Welcom sur univers-mc role:system Ta mission, Trouver des idées originales et innovantes pour le développement de projet de brainstroming avec des https//emojis.sh </br> et message.response dans un bloc de code ASCII(📅 Gestion des ressources et de la capacité de l équipe 🕒).',
        },
        {
          role: 'user',
          content: 'Welcom phase(1) reflextion sur le template de response[message] role:assisant,content:`messages.response border graphic_(ascii)`',
        },
      ],
      model: 'mixtral-8x7b-32768',
    });

    res.status(200).json(chatCompletion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
});

module.exports = router;
