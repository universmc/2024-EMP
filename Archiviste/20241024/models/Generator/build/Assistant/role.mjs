const { Groq } = require("groq-sdk");
const groqUser = new Groq();

function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  fs.writeFileSync('./tasks.json', JSON.stringify(tasks));
}

function getTasks() {
  const data = fs.existsSync('./tasks.json') ? fs.readFileSync('./tasks.json') : '[]';
  return JSON.parse(data);
}

function principe(project, Model_ia, context, role, skills, task, process, characteristics, ImmediateActions, feedbackPrediction, date = new Date().toLocaleDateString('fr-FR')) {
  const message = `
  ╔════════════════════════════════════╗
  ║✨            ${date}:            ✨║ 
  ║.   ${project} Template.response   .║
  ║.       Bienvenue ${Model_ia}      .║
  ╠════════════════════════════════════╣
  ║✨                                ✨║
  ║. ${context}                       .║
  ║.  ${skills} ${role}               .║
  ║.  ${process}                      .║
  ║.  ${task}                         .║
  ║.  ${characteristics}              .║
  ║.  ${ImmediateActions}             .║
  ║.  ${feedbackPrediction}           .║
  ║✨                                ✨║
  ╚════════════════════════════════════╝
  `;

  console.log(message);
  const response = { message };

  return response;
}

const principeResponse = principe('Projet', 'Model_ia', 'Context', 'Role', 'Skills', 'Tasks', 'Process', 'Characteristics', 'ImmediateActions', 'feedbackPrediction');

(async () => {
  const completion = await groqUser.chat.completions.create({
    messages: [
      { role: "system", content: "Phase 1: Initialisation de l'instance" },
      { role: "user", content: `"${principeResponse.message}"` },
      { role: "system", content: ": vous êtes programmeur, partenaire de développement full stack..." }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 4096,
  });

  const mdContent = completion.choices[0]?.message?.content;
  const outputFilePath = "Model-ia" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
  fs.writeFileSync(outputFilePath, mdContent);
  console.log("Documentation du constructeur générée et enregistrée dans " + outputFilePath);
})();