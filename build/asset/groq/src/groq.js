const Groq = require('groq-sdk');
const groq = new Groq();

// Créer une fonction pour traiter la logique Groq
const groqHandler = async (message) => {
  // Créez une requête Groq avec le message utilisateur
const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
    model: 'mixtral-8x7b-32768',
  });

  // Retournez la réponse Groq
return chatCompletion;
};

module.exports = groqHandler;
