import inquirer from 'inquirer';
import fs from 'fs';
import axios from 'axios';
import OpenAI from 'openai';
import Groq from 'groq-sdk';

const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Chargement des intentions et des informations d'enquête depuis un fichier JSON
const intents = JSON.parse(fs.readFileSync('intent.json', 'utf8'));

// Fonction principale pour démarrer l'interaction
async function main() {
  const subject = process.argv[2] || "Enquête_EMP";

  console.log("Bienvenue dans Questor.js - Enquête sur l'affaire EMP");
  
  const questions = [
    {
      type: 'list',
      name: 'section',
      message: 'Quelle section souhaitez-vous explorer ?',
      choices: ['Questionnaires', 'Analyse de Données', 'Rapport d’Enquête'],
    },
    {
      type: 'list',
      name: 'operation',
      message: 'Quelles opérations souhaitez-vous effectuer ?',
      choices: ['Créer', 'Analyser', 'Rapporter'],
      when: (answers) => answers.section === 'Questionnaires',
    },
    {
      type: 'list',
      name: 'dataAnalysisType',
      message: 'Quel type d\'analyse souhaitez-vous exécuter ?',
      choices: ['Détection de tendances', 'Extraction d\'irrégularités'],
      when: (answers) => answers.section === 'Analyse de Données',
    },
    {
      type: 'list',
      name: 'reportFormat',
      message: 'Quel format de rapport souhaitez-vous générer ?',
      choices: ['Rapport Visuel', 'Dossier Détaillé'],
      when: (answers) => answers.section === 'Rapport d’Enquête',
    },
  ];

  const answers = await inquirer.prompt(questions);

  console.log(`Action sélectionnée : ${answers.section} avec option ${answers.operation || answers.dataAnalysisType || answers.reportFormat}`);

  await performTask(answers, subject);
}

// Exécution des tâches en fonction des réponses
async function performTask(answers, subject) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: intents.system[answers.section] },
        { role: 'assistant', content: intents.assistant[answers.section] },
        { role: 'user', content: `Utilisateur a choisi la section ${answers.section} avec option ${answers.operation || answers.dataAnalysisType || answers.reportFormat}.` }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2048,
    });

    const generatedContent = completion.choices[0]?.message?.content || 'Aucune réponse générée';
    console.log("Complétion générée:", generatedContent);

    const filePath = `output/${answers.section}_${subject}.md`;
    fs.writeFileSync(filePath, generatedContent);
    console.log(`Contenu généré sauvegardé dans ${filePath}`);

    if (answers.section === 'Questionnaires') {
      await handleQuestionnaires(answers, subject);
    } else if (answers.section === 'Analyse de Données') {
      await handleDataAnalysis(answers, subject);
    } else if (answers.section === 'Rapport d’Enquête') {
      await handleReporting(answers, subject);
    }
  } catch (error) {
    console.error("Erreur lors de l'exécution des tâches:", error.message);
  }
}

// Gestion des questionnaires
async function handleQuestionnaires(answers, subject) {
  console.log("Création ou Analyse des questionnaires...");
  // Ici vous implémentez les détails pour créer et analyser des questionnaires
}

// Gestion de l'analyse de données
async function handleDataAnalysis(answers, subject) {
  console.log("Exécution de l'analyse des données...");
  // Implémentation de l'analyse des tendances et extraction des irrégularités
}

// Gestion du reporting
async function handleReporting(answers, subject) {
  console.log("Génération des rapports...");
  // Implémentation pour générer des rapports visuels ou détaillés
}

// Fonction pour générer le contenu avec OpenAI et DALL-E pour les éléments visuels
async function fetchOpenAIContent(subject) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'user', content: `Génération d'un contenu pour l'enquête sur ${subject}.` }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048
  });
  
  const contentText = chatCompletion.choices[0]?.message?.content || '';
  const imageUrl = await generateImage(subject);

  return { text: contentText, image: imageUrl };
}

// Génération d'une image associée à l'enquête
async function generateImage(subject) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Générer une image décrivant l'affaire ${subject}`,
    n: 1,
    size: "1024x1024"
  });

  const imageUrl = response.data[0].url;
  const imageFile = `output/image_${subject}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);
  
  return imageFile;
}

main();