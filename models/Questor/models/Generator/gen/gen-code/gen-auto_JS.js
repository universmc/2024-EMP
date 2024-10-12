const fs = require('fs');
const OpenAI = require('openai');
const axios = require('axios');
const Groq = require('groq-sdk');
const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const subject = process.argv[2] || "Apprentissage_automatique_du_Javacript";

async function generateWebPage(subject) {
  console.log("Démarrage de la génération de la page Web pour le sujet : ", subject);

  // Boucle 1: Génération du contenu basé sur le sujet/thème
  const content = await generateContent(subject);
  
  // Boucle 2: Génération de la structure HTML/CSS
  const structure = generateStructure(content);
  
  // Boucle 3: Intégration des fonctionnalités interactives
  const page = integrateJavaScript(structure);

  // Sauvegarde du fichier HTML généré
  const fileName = `generated_page_${subject}.html`;
  fs.writeFileSync(fileName, page);
  console.log(`Page Web générée et sauvegardée dans ${fileName}`);
}

// Boucle 1: Génération du contenu basé sur le sujet/thème
async function generateContent(subject) {
  console.log("Génération du contenu pour le sujet :", subject);

  // Générer le texte via un modèle de langage (OpenAI/Groq)
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "user", content: `Génère un contenu détaillé pour une page Web sur le sujet : ${subject}` }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048
  });

  const contentText = chatCompletion.choices[0]?.message?.content || '';
  
  // Générer une image pour le sujet via OpenAI DALL-E
  const imageUrl = await generateImage(subject);

  return { text: contentText, image: imageUrl };
}

// Générer une image via OpenAI DALL-E
async function generateImage(subject) {
  console.log("Génération d'image pour le sujet :", subject);

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Une image descriptive pour le sujet : ${subject}`,
    n: 1,
    size: "1024x1024"
  });

  const imageUrl = response.data[0].url;
  const imageFile = `image_${subject}_${new Date().toISOString()}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);

  return imageFile;
}

// Boucle 2: Génération de la structure HTML/CSS
function generateStructure(content) {
  console.log("Génération de la structure HTML et CSS");

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Web - ${subject}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    .description {
      font-size: 18px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="content">
    <h1>${subject}</h1>
    <img src="${content.image}" alt="Image pour ${subject}">
    <div class="description">
      ${content.text}
    </div>
  </div>
</body>
</html>
  `;
  return html;
}

// Boucle 3: Intégration des fonctionnalités interactives (JavaScript)
function integrateJavaScript(html) {
  console.log("Intégration des fonctionnalités interactives avec JavaScript");

  const script = `
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      console.log("Page chargée pour le sujet : ${subject}");
      // Ajoutez ici des fonctionnalités interactives si besoin (animations, appels API, etc.)
    });
  </script>
  `;

  // Insertion du script dans le HTML
  const finalHtml = html.replace('</body>', script + '\n</body>');
  return finalHtml;
}

// Exécution principale
generateWebPage(subject);
