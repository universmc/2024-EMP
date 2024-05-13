const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const { exec } = require('child_process');

// Charger les fichiers JSON par défaut depuis le répertoire backend/json
const defaultAssistantData = require('../../../srv/json/roles-assistant.json');
const defaultConfigData = require('./config.json');

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(role) {
  return new Promise((resolve) => {
    rl.question(`${role.description}: `, (input) => {
      resolve(input);
    });
  });
}

// Fonction pour modifier le nom de l'assistant
function changeAssistantName(newName) {
  defaultAssistantData.description = newName;
  console.log(`✨_pi  : ${defaultAssistantData.description}`);
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  changeAssistantName(defaultAssistantData.description || "Bonjour, je suis votre assistant IA ✨_pi .");

  let sessionActive = true;
  let userInput;

  while (sessionActive) {
    userInput = await getUserInput(defaultAssistantData);

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("✨_pi : Au revoir !");
      continue;
    }

    // Switch pour le changement de persona
    if (userInput.toLowerCase().startsWith("/persona")) {
      const newPersona = userInput.toLowerCase().split("/persona ")[1];
      const personaFilePath = `./srv/json/persona_${newPersona}.json`;

      // Vérifier si le fichier JSON de la nouvelle persona existe
      if (fs.existsSync(personaFilePath)) {
        // Charger les données de la nouvelle persona
        const newAssistantData = require(personaFilePath);
        changeAssistantName(newAssistantData.description);
        console.log(`🦉_pi : Changement de persona effectué. Nouvelle persona : ${newPersona}`);
        continue;
      } else {
        console.log(`Assistant: La persona ${newPersona} n'existe pas.`);
        continue;
      }
    }

    // Génération de réponses à l'aide de Groq SDK en fonction de la persona par défaut
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: defaultAssistantData.nom,
            content: defaultAssistantData.description || "System is ready."
          },
          {
            role: defaultAssistantData.nom,
            content: userInput
          }
        ],
        model: defaultAssistantData.modelName || "mixtral-8x7b-32768",
        temperature: 0.6,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      // Affichage de la réponse générée
      const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
      console.log(`🦉_pi : ${fullResponse}`);
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse de l'assistant :", error);
    }
  }

  rl.close();
}

// Exécution de la fonction principale
main().catch(console.error);
