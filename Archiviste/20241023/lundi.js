const fs = require('fs');
const axios = require('axios');
const Groq = require('groq-sdk');
const marked = require('marked');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const workPlan = require('./workplan.json'); // Charger le plan de travail à partir du fichier JSON

// Fonction principale pour générer la page web pour chaque phase du projet
async function generateWebPagesForPhases() {
  for (const task of workPlan.tasks) {
    try {
      console.log(`Démarrage de la génération de la page Web pour la phase : ${task.phase}`);
      
      // Générer le contenu en fonction de la phase
      const content = await generateContent(task.phase);

      // Générer la structure HTML/CSS/JS pour chaque phase
      await generateStructure(content, task.phase);

      console.log(`Page Web générée avec succès pour la phase : ${task.phase}`);
    } catch (error) {
      console.error(`Erreur lors de la génération de la page pour la phase ${task.phase} :`, error);
    }
  }
}

// Fonction pour générer le contenu texte au format Markdown
async function generateContent(phase) {
  console.log("Génération du contenu pour la phase :", phase);

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Génère un contenu détaillé pour une page Web sur la phase : ${phase}` }],
      model: "gemma2-9b-it",
      temperature: 0.7,
      max_tokens: 2048
    });

    const contentText = chatCompletion.choices[0]?.message?.content || 'Contenu indisponible';

    // Convertir le contenu Markdown en HTML avec marked
    const contentHTML = marked(contentText);

    return { html: contentHTML };
  } catch (error) {
    console.error("Erreur lors de la génération du contenu :", error);
    throw error;
  }
}

// Fonction pour générer la structure HTML/CSS/JS
async function generateStructure(content, phase) {
  try {
    console.log("Génération de la structure HTML/CSS/JS pour la phase :", phase);

    // Générer HTML avec le menu de navigation dynamique
    const html = generateHTML(content.html, phase);
    const htmlFile = `page_${phase}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.html`;
    fs.writeFileSync(htmlFile, html);

    // Générer CSS
    const css = generateCSS();
    const cssFile = `src/css/style_${phase}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.css`;
    fs.writeFileSync(cssFile, css);

    // Générer JS pour la navigation dynamique
    const js = generateJavaScript(phase);
    const jsFile = `src/js/nav_${phase}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.js`;
    fs.writeFileSync(jsFile, js);

    // Générer JSON pour le pipeline de données
    const json = generatePipelineJSON(phase);
    const jsonFile = `src/json/pipeline_${phase}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.json`;
    fs.writeFileSync(jsonFile, json);

    console.log("Structure HTML/CSS/JS générée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la génération de la structure :", error);
    throw error;
  }
}

// Générateur HTML avec intégration d'un menu de navigation basé sur le JSON pipeline
function generateHTML(contentHTML, phase) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page sur ${phase}</title>
    <link href="src/css/style_${phase}.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1 class="title">${phase}</h1>
      <nav id="sommaire"></nav>
      <div class="content">
        ${contentHTML}  <!-- Affiche le contenu Markdown converti en HTML -->
      </div>
      <div id="content"></div>
    </div>
    <script src="src/js/nav_${phase}.js"></script>
  </body>
  </html>
  `;
}

// Générateur CSS pour le menu de navigation et la structure
function generateCSS() {
  return `
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

.title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

nav {
  background: #333;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

nav a {
  color: #fff;
  margin-right: 15px;
  text-decoration: none;
  font-size: 1.2em;
}

nav a:hover {
  text-decoration: underline;
}

.content {
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
}
  `;
}

// Générateur JavaScript avec création dynamique du menu de navigation
function generateJavaScript(phase) {
  return `
  document.addEventListener('DOMContentLoaded', function() {
    const sommaire = document.getElementById('sommaire');

    // Charger le pipeline JSON correspondant à la phase
    fetch('src/json/pipeline_${phase}.json')
      .then(response => response.json())
      .then(pipeline => {
        pipeline.forEach(section => {
          const sectionLink = document.createElement('a');
          sectionLink.href = '#section-' + section.titre;
          sectionLink.textContent = section.titre;
          sommaire.appendChild(sectionLink);

          // Ajouter les sections dynamiquement dans le contenu
          const contentDiv = document.getElementById('content');
          const sectionDiv = document.createElement('div');
          sectionDiv.id = 'section-' + section.titre;
          sectionDiv.innerHTML = '<h2>' + section.titre + '</h2>';

          section.sousSections.forEach(sousSection => {
            const sousSectionDiv = document.createElement('div');
            sousSectionDiv.innerHTML = '<h3>' + sousSection.sousTitre + '</h3><p>' + sousSection.contenu + '</p>';
            sectionDiv.appendChild(sousSectionDiv);
          });

          contentDiv.appendChild(sectionDiv);
        });
      });
  });
  `;
}

// Générateur JSON pour pipeline
function generatePipelineJSON(phase) {
  const pipeline = [
    {
      titre: "Introduction",
      sousSections: [
        { sousTitre: "Contexte", contenu: `Description du contexte de la phase: ${phase}` },
        { sousTitre: "Objectifs", contenu: "Présenter les objectifs principaux de cette phase." }
      ]
    },
    {
      titre: "Développement",
      sousSections: [
        { sousTitre: "Étape 1", contenu: "Détails de l'étape 1." },
        { sousTitre: "Étape 2", contenu: "Détails de l'étape 2." },
        { sousTitre: "Étape 3", contenu: "Détails de l'étape 3." }
      ]
    }
  ];

  return JSON.stringify(pipeline, null, 2);
}

// Exécution de la génération des pages pour chaque phase
generateWebPagesForPhases();
