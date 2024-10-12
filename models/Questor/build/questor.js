import inquirer from 'inquirer';
import fs from 'fs';
import Groq from 'groq-sdk';

// Initialiser le client Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Charger les rôles à partir des fichiers JSON
const rolesSystem = JSON.parse(fs.readFileSync('./instance/roles-system.json', 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync('./instance/roles-user.json', 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync('./instance/roles-assistant.json', 'utf8'));

// Charger le fichier JSON de la politique du prix
const pricePolicyData = JSON.parse(fs.readFileSync('politique_du_prix.json', 'utf8'));

// Questions liées au choix du rôle initial
const roleQuestions = [
  {
    type: 'list',
    name: 'roleChoice',
    message: 'Quel rôle souhaitez-vous utiliser pour cette génération ?',
    choices: [rolesSystem.name, rolesUser.name, rolesAssistant.name],
  }
];

// Générer une réponse structurée en fonction d'une politique donnée
function templateResponse(question, options, consequences, nextQuestions, causes, effects) {
  return {
    response: {
      question,
      answer: {
        text: "Les possibilités sont multiples.",
        quick_replies: options
      },
      decision_tree: options.reduce((acc, option, index) => {
        acc[`Option ${index + 1}`] = {
          consequences: consequences[index],
          next_questions: nextQuestions[index],
          causes: causes[index],
          effects: effects[index]
        };
        return acc;
      }, {})
    }
  };
}

// Fonction principale pour démarrer l'interaction
async function main() {
  const { roleChoice } = await inquirer.prompt(roleQuestions);

  const selectedRole = [rolesSystem, rolesUser, rolesAssistant].find(role => role.name === roleChoice);

  console.log(`Rôle sélectionné : ${selectedRole.name}`);

  const question = "Quelle est la meilleure façon de procéder pour enquêter sur la politique du prix ?";
  const options = [
    "Analyser les coûts liés aux transports publics",
    "Examiner les marges pratiquées sur les produits",
    "Suivre les flux financiers des entités politiques"
  ];

  const consequences = [
    pricePolicyData.investigation.entites_politique.enquete.prix_transports_publics.description,
    pricePolicyData.investigation.prix_produits.analyse.enjeux,
    pricePolicyData.investigation.etapes_investigation.identification_beneficiaires.description
  ];

  const nextQuestions = [
    ["Quels sont les bénéfices non déclarés des entités politiques ?", "Comment les marges des produits influencent-elles les finances publiques ?"],
    ["Quels produits sont particulièrement concernés ?", "Les preuves trouvées sont-elles suffisantes pour soutenir les accusations ?"],
    ["Qui sont les bénéficiaires réels des bénéfices de la vente de produits publics ?"]
  ];

  const causes = [
    "Les coûts de transport ont un impact direct sur la gestion des finances publiques.",
    "Les marges sur les produits peuvent cacher des détournements de fonds publics.",
    "Les flux financiers doivent être surveillés pour identifier les bénéficiaires non déclarés."
  ];

  const effects = [
    ["Vous découvrez des irrégularités dans les bénéfices des entités politiques", "Le transport public pourrait subir des hausses injustifiées"],
    ["Les preuves sont recueillies sur les produits vendus via des entités comme Elysee X", "Vous avancez dans la compréhension des flux financiers"],
    ["Vous identifiez des bénéficiaires non déclarés et des malversations potentielles", "Vous pourriez exposer de graves fraudes financières"]
  ];

  const response = templateResponse(question, options, consequences, nextQuestions, causes, effects);
  console.log("Réponse structurée : ", response);
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: `Phase 1: Initialisation de l'enquête avec le rôle ${roleChoice}` },
        { role: "system", content: "Utilisation des données de la politique du prix pour structurer les questions et options" },
        { role: "user", content: "Début de l'analyse sur les flux financiers et les entités politiques" }
      ],
      model: selectedRole.model,
      temperature: selectedRole.temperature,
      max_tokens: selectedRole.max_tokens,
    });

    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "Documentation_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent || '' );
    console.log("Documentation générée et enregistrée dans " + outputFilePath);
  } catch (error) {
    console.error("Erreur lors de la génération de la complétion:", error.message);
  }
}

main();