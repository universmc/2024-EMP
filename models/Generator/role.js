const { Groq } = require("groq-sdk");
const groqUser = new Groq();
const fs = require("fs");

// Fonction pour ajouter une tâche à la persistance des tâches
function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  fs.writeFileSync('./tasks.json', JSON.stringify(tasks));
}

// Fonction pour récupérer les tâches
function getTasks() {
  const data = fs.existsSync('./tasks.json') ? fs.readFileSync('./tasks.json', 'utf8') : '[]';
  return JSON.parse(data);
}

// Fonction principale pour créer un message stylisé et le structurer en JSON
function principe(project, Model_ia, context, role, skills, task, process, characteristics, ImmediateActions, feedbackPrediction, date = new Date().toLocaleDateString('fr-FR')) {
  const message = `
  ╔════════════════════════════════════════╗
  ║ ⭐️ Data Report - ${date} ⭐️         ║
  ╟────────────────────────────────────────╢
  ║ 📋 Project: ${project}                     ║
  ║ 📈 Model: ${Model_ia}                     ║
  ║ 🌐 Context: ${context}                    ║
  ║ 💼 Role: ${role}                          ║
  ║ 🚀 Skills: ${skills}                      ║
  ║ 📋 Tasks: ${task}                        ║
  ║ 🔄 Process: ${process}                    ║
  ║ 🛠 Characteristics: ${characteristics}     ║
  ║ ⚡️ Immediate Actions: ${ImmediateActions} ║
  ║ 🔮 Feedback: ${feedbackPrediction}        ║
  ╚════════════════════════════════════════╝
  `;

  console.log(message);

  const response = {
    date,
    project,
    Model_ia,
    context,
    role,
    skills,
    task,
    process,
    characteristics,
    ImmediateActions,
    feedbackPrediction,
    message
  };

  return response;
}

// Generer le contenu JSON à partir de la réponse formatté
(async () => {
  const principeResponse = principe(
    'Projet', 
    'Model_ia', 
    'Context', 
    'Role', 
    'Skills', 
    'Tasks', 
    'Process', 
    'Characteristics', 
    'ImmediateActions', 
    'feedbackPrediction'
  );

  const completion = await groqUser.chat.completions.create({
    messages: [
      { role: "assistant", content: "Initialisation de l'instance" },
      { role: "user", content: JSON.stringify(principeResponse) },
      { role: "system", content: "Ta réponse devra être rédigé intégralement au format JSON Pour être optimisé dans un autre algorithme" }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 4096,
  });

  const jsonContent = completion.choices[0]?.message?.content;
  const outputFilePath = "Model-ia_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".json";
  fs.writeFileSync(outputFilePath, jsonContent);
  console.log("Documentation du constructeur générée et enregistrée dans " + outputFilePath);
})();