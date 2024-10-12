const Groq = require("groq-sdk");
const groq = new Groq();

// Présentation du projet dans Mandatory_bot.js
async function presentProject() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'assistant', content: `Rôle de Mandatory_bot :
MandatoryBot sert de comptable central et d'auditeur pour GPT-Wallet, traitant les transactions avec pi.coins et umcTokens.sol pour garantir l'intégrité financière et la conformité légale.` }
    ],
    model: 'mixtral-8x7b-32768',
    temperature: 0.8,
  });

  console.log(chatCompletion.choices[0].message.content);
}

presentProject();

// FONCTION DE GESTION FINANCIÈRE
async function manageFinances() {
  // Implementez votre logique de gestion des finances comme discuté
}

setInterval(manageFinances, 30000); // Répéter toutes les 30 secondes

module.exports = { manageFinances };