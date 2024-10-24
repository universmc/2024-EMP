const fs = require('fs');
const OpenAI = require('openai');
const axios = require('axios');
const Groq = require('groq-sdk');
const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const project = process.argv[2] || "Chronique_Politique";

async function generateWebPage(project) {
  console.log("Démarrage de la génération de la page Web pour le projet : ", project);

  // Boucle 1: Génération du contenu basé sur le projet/thème
  const content = await generateContent(project);
  
  // Boucle 2: Génération de la structure HTML/CSS/JS et de l'image
  await generateStructure(content, project);

  console.log(`Page Web générée avec succès pour le projet : ${project}`);
}

// Boucle 1: Génération du contenu basé sur le projet/thème
async function generateContent(project) {
  console.log("Génération du contenu pour le projet :", project);

  // Générer le texte via un modèle de langage (OpenAI/Groq)
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "user", content: `Génère un contenu détaillé pour une page Web sur le projet : ${project}` }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048
  });

  const contentText = chatCompletion.choices[0]?.message?.content || '';
  
  // Générer une image pour le projet via OpenAI DALL-E
  const imageUrl = await generateImage(project);

  return { text: contentText, image: imageUrl };
}

// Générer une image via OpenAI DALL-E
async function generateImage(project) {
  console.log("Génération d'image pour le projet :", project);

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Une image descriptive pour le projet : ${project}`,
    n: 1,
    size: "1792x1024"
  });

  const imageUrl = response.data[0].url;
  const imageFile = `src/img/image_${project}_${new Date().toISOString()}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);

  console.log(`Image générée et sauvegardée sous ${imageFile}`);
  return imageFile;
}

// Boucle 2: Génération de la structure HTML/CSS/JS
async function generateStructure(content, project) {
  console.log("Génération de la structure index.HTML, style.css CSS et pipeline.JS, pipeline.JSON");

  // Générer HTML
  const html = generateHTML(content, project);
  const htmlFile = `page_${project}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.html`;
  fs.writeFileSync(htmlFile, html);
  console.log(`HTML sauvegardé dans ${htmlFile}`);

  // Générer CSS
  const css = generateCSS();
  const cssFile = `src/css/style_${project}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.css`;
  fs.writeFileSync(cssFile, css);
  console.log(`CSS sauvegardé dans ${cssFile}`);

  // Générer JS
  const js = generateJavaScript(project);
  const jsFile = `src/js/pipeline_${project}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.js`;
  fs.writeFileSync(jsFile, js);
  console.log(`JavaScript sauvegardé dans ${jsFile}`);

  // Générer JSON pour pipeline de données
  const json = generatePipelineJSON(project);
  const jsonFile = `src/json/pipeline_${project}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.json`;
  fs.writeFileSync(jsonFile, json);
  console.log(`Pipeline JSON sauvegardé dans ${jsonFile}`);
}

// Générateur HTML
function generateHTML(content, project) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page sur ${project}</title>
    <link href="src/css/style_${project}.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1 class="title">${project}</h1>
      <div class="image">
        <img src="${content.image}" alt="Image descriptive de ${project}">
      </div>
      <div class="content">
        ${content.text}
      </div>
      <div id="sommaire"></div>
      <div id="content"></div>
    </div>
    <script src="src/js/pipeline_${project}.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  </body>
  </html>
  `;
}

// Générateur CSS
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
  .image {
    margin-bottom: 20px;
    text-align: center;
  }
  .image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .content {
    font-size: 1.2em;
    line-height: 1.6;
    color: #555;
  }
  .sommaire-link {
    display: block;
    margin-bottom: 10px;
    color: #0056b3;
    text-decoration: none;
  }
  `;
}

// Générateur JavaScript
function generateJavaScript(project) {
  return `
  document.addEventListener('DOMContentLoaded', function() {
    fetch('src/json/pipeline_${project}.json')
        .then(response => response.json())
        .then(cours => {
            const sommaire = document.getElementById('sommaire');
            const contenuCours = document.getElementById('content');

            cours.forEach((section, index) => {
                let sommaireItem = document.createElement('a');
                sommaireItem.href = \`#section\${index}\`;
                sommaireItem.textContent = section.titre;
                sommaireItem.classList.add('sommaire-link');
                sommaire.appendChild(sommaireItem);

                let sectionDiv = document.createElement('div');
                sectionDiv.id = \`section\${index}\`;
                sectionDiv.classList.add('section');

                let titreSection = document.createElement('h2');
                titreSection.textContent = section.titre;
                sectionDiv.appendChild(titreSection);

                section.sousSections.forEach(sousSection => {
                    let sousSectionDiv = document.createElement('div');
                    sousSectionDiv.classList.add('sous-section');

                    let sousTitre = document.createElement('h3');
                    sousTitre.textContent = sousSection.sousTitre;
                    sousSectionDiv.appendChild(sousTitre);

                    if (sousSection.contenuMarkdown) {
                        fetch(sousSection.contenuMarkdown)
                            .then(responseMd => responseMd.text())
                            .then(markdown => {
                                let contenu = document.createElement('div');
                                contenu.className = 'markdown-contenu';
                                contenu.innerHTML = marked.parse(markdown);
                                sousSectionDiv.appendChild(contenu);
                            });
                    } else {
                        let contenu = document.createElement('p');
                        contenu.innerHTML = sousSection.contenu;
                        sousSectionDiv.appendChild(contenu);
                    }

                    sectionDiv.appendChild(sousSectionDiv);
                });

                contenuCours.appendChild(sectionDiv);
            });
        });
  });
  `;
}

// Générateur JSON pour pipeline
function generatePipelineJSON(project) {
  const pipeline = [
    {
      titre: "Introduction",
      sousSections: [
        { sousTitre: "Contexte", contenu: "Description du contexte, objectifs SMARTt." },
        { sousTitre: "Objectifs", contenuMarkdown: "src/md/init.md" }
      ]
    },
    {
      titre: "Développement_Mode(Missions+generative-ia)",
      sousSections: [
        { sousTitre: "Étape 1", contenuMarkdown: "src/md/etape1.md" },
        { sousTitre: "Étape 2", contenuMarkdown: "src/md/etape2.md" }
      ]
    }
    // Ajouter d'autres sections si nécessaire
  ];

  return JSON.stringify(pipeline, null, 2);
}

// Exécution principale
generateWebPage(project);
