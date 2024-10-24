const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Charger les fichiers JSON de rôles Groq
const rolesSystem = JSON.parse(fs.readFileSync(path.join(__dirname, 'instance/roles-system.json'), 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync(path.join(__dirname, 'instance/roles-assistant.json'), 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync(path.join(__dirname, 'instance/roles-user.json'), 'utf8'));

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  console.log(`Assistant: ${rolesAssistant.intro || "Bonjour, je suis votre assistant IA."}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput("Vous: ");

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Exécuter des commandes shell en réponse à la "commande magique"
    if (userInput.toLowerCase().includes("commande magique")) {
      try {
        const output = await executeShellCommand(rolesAssistant.command || "echo 'Aucune commande définie'");
        console.log(`Résultat de la commande: ${output}`);
      } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande: ${error}`);
      }
      continue;
    }

    // Génération de réponses basées sur les rôles définis
    try {
      const role = userInput.includes('Questor') ? rolesSystem : userInput.includes('Journaliste') ? rolesUser : rolesAssistant;
      
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: role.name || "system",
            content: userInput
          }
        ],
        model: role.model || "mixtral-8x7b-32768",
        temperature: role.temperature || 0.9,
        max_tokens: role.max_tokens || 1024,
        top_p: role.top_p || 1,
        stream: role.stream || false,
        stop: role.stop || null
      });

      const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
      console.log(`Assistant: ${fullResponse}`);
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse de l'assistant :", error);
    }
  }

  rl.close();
}

main().catch(console.error);