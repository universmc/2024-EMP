const { Groq } = require("groq-sdk");
const fs = require("fs");
const inquirer = require("inquirer");

const groqUser = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Chargement des fichiers de définition de rôle
const rolesSystem = JSON.parse(fs.readFileSync('./role/roles-system.json', 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync('./role/roles-user.json', 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync('./role/roles-assistant.json', 'utf8'));

// Fonction pour ajouter une tâche à la persistance des tâches
function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  fs.writeFileSync('./tasks.json', JSON.stringify(tasks));
}

// Fonction pour récupérer les tâches en cours
function getTasks() {
  const data = fs.existsSync('./tasks.json') ? fs.readFileSync('./tasks.json', 'utf8') : '[]';
  return JSON.parse(data);
}

// Fonction structurant le message JSON
function createPrinciple(project, modelIa, context, role, skills, task, process, characteristics, immediateActions, feedbackPrediction) {
  const date = new Date().toLocaleDateString('fr-FR');
  const message = `
  ╔════════════════════════════════════════╗
  ║ ⭐️ Data Report - ${date} ⭐️         ║
  ╟────────────────────────────────────────╢
  ║ 📋 Project: ${project}                     ║
  ║ 📈 Model: ${modelIa}                       ║
  ║ 🌐 Context: ${context}                    ║
  ║ 💼 Role: ${role}                          ║
  ║ 🚀 Skills: ${skills}                      ║
  ║ 📋 Tasks: ${task}                        ║
  ║ 🔄 Process: ${process}                    ║
  ║ 🛠 Characteristics: ${characteristics}     ║
  ║ ⚡️ Immediate Actions: ${immediateActions} ║
  ║ 🔮 Feedback: ${feedbackPrediction}        ║
  ╚════════════════════════════════════════╝
  `;

  console.log(message);

  const response = {
    date,
    project,
    modelIa,
    context,
    role,
    skills,
    task,
    process,
    characteristics,
    immediateActions,
    feedbackPrediction,
    message
  };

  return response;
}

// Interaction avec l'utilisateur pour définir les paramètres de l'instance
async function getUserInputForInstance() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'project', message: 'Nom du projet:' },
    { type: 'input', name: 'modelIa', message: 'Modèle d\'IA:' },
    { type: 'input', name: 'context', message: 'Contexte d\'utilisation:' },
    { type: 'input', name: 'role', message: 'Rôle de l\'IA:' },
    { type: 'input', name: 'skills', message: 'Compétences requises:' },
    { type: 'input', name: 'task', message: 'Tâches à réaliser:' },
    { type: 'input', name: 'process', message: 'Processus:' },
    { type: 'input', name: 'characteristics', message: 'Caractéristiques:' },
    { type: 'input', name: 'immediateActions', message: 'Actions immédiates à prendre:' },
    { type: 'input', name: 'feedbackPrediction', message: 'Prédiction de retour:' }
  ]);

  return createPrinciple(
    answers.project,
    answers.modelIa,
    answers.context,
    answers.role,
    answers.skills,
    answers.task,
    answers.process,
    answers.characteristics,
    answers.immediateActions,
    answers.feedbackPrediction
  );
}

// Génération et sauvegarde du contenu JSON
(async () => {
  const principleResponse = await getUserInputForInstance();

  const completion = await groqUser.chat.completions.create({
    messages: [
      { role: "assistant", content: "Initialisation de l'instance" },
      { role: "user", content: JSON.stringify(principleResponse) },
      { role: "system", content: "Ta réponse devra être rédigé intégralement au format JSON Pour être optimisé dans un autre algorithme" }
    ],
    model: rolesSystem.model || "mixtral-8x7b-32768",
    temperature: rolesSystem.temperature || 0.6,
    max_tokens: rolesSystem.max_tokens || 4096,
  });

  const jsonContent = completion.choices[0]?.message?.content;
  const outputFilePath = "Model-ia_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".json";
  fs.writeFileSync(outputFilePath, jsonContent);
  console.log("Documentation du constructeur générée et enregistrée dans " + outputFilePath);
})();