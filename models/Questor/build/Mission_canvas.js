const fs = require('fs');
const OpenAI = require('openai');
const axios = require('axios');
const Groq = require('groq-sdk');
const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Prompts pour la génération d'images DALL-E
const imagePrompts = {
  'MISSION_AL': "Imagine interacting with Three.js algorithms, visualizing all the necessary components for its operation in AlgoGenesis.",
  'MISSION_AZ': "Imagine a high-definition, multidimensional, programmable image that visualizes all the essential components necessary for the functioning of AlgoGenesis.",
  'MISSION_A': "A sophisticated wireframe for a dashboard with analytics, focusing on machine learning project tracking for AlgoGenesis."
};

// Sources CSS et JS
const dataSource = {
  css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  js: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  threeJs: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
};

// Fonction pour générer l'image via OpenAI
async function generateImage(subject) {
  try {
    const prompt = imagePrompts[subject];
    if (!prompt) return null;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",
    });

    const imageUrl = response.data[0].url;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const fileName = `build/image_${subject}_${new Date().toISOString().split('T')[0]}.webp`;
    fs.writeFileSync(fileName, imageResponse.data);

    return fileName;
  } catch (error) {
    console.error("Error generating or saving the image:", error);
    return null;
  }
}

// Fonction pour générer le canevas avec Three.js
async function generateCanvasForSubject(subject) {
  switch (subject) {
    case 'project_AL':
      return `
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      `;
    case 'project_AZ':
      return `
      const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);
      `;
    case 'project_A':
      return `
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      `;
    default:
      return `
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const defaultObject = new THREE.Mesh(geometry, material);
      scene.add(defaultObject);
      `;
  }
}

// Fonction de génération du HTML pour un projet
async function generateProjectHTML(subject, page = 1, totalPages = 3) {
  const imageFileName = await generateImage(subject);
  const documentation = await generateDocumentation(subject);
  const canvasCode = await generateCanvasForSubject(subject);
  
  if (!imageFileName || !documentation || !canvasCode) return;

  const paginationHtml = generatePagination(page, totalPages);
  const title = `How-To Guide: ${subject}`;

  // Structure HTML avec Bootstrap pour un layout responsive
  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="${dataSource.css}" rel="stylesheet">
  <style>
    #canvas { width: 100%; height: 400px; border: 1px solid #ccc; margin-top: 20px; }
  </style>
</head>
<body class="bg-light">
  <div class="container mt-5">
    <h1 class="text-center">${title}</h1>
    <div class="row">
      <div class="col-md-6">
        <img src="${imageFileName}" alt="${subject}" class="img-fluid rounded shadow">
      </div>
      <div class="col-md-6">
        <h2>Description</h2>
        <p>${imagePrompts[subject]}</p>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <h2>Guide d'Étapes</h2>
        <div class="how-to bg-white p-3 rounded shadow-sm">${documentation}</div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        ${paginationHtml}
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <div id="canvas"></div> <!-- Canevas dynamique -->
      </div>
    </div>
  </div>

  <script src="${dataSource.js}"></script>
  <script src="${dataSource.threeJs}"></script>
  <script>
    // Initialisation de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 400);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // Dynamically injected geometry for this subject
    ${canvasCode}

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>
  `;

  const htmlFileName = `build/${subject}_howto_page${page}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.html`;
  fs.writeFileSync(htmlFileName, htmlContent);
  console.log(`HTML file for ${subject} saved as ${htmlFileName}`);
}

// Fonction pour générer la documentation
async function generateDocumentation(subject) {
  const completion = await groq.chat.completions.create({
    messages: [{ role: "assistant", content: `Generating a How-To guide for ${subject}...` }],
    model: "gemma2-9b-it",
    temperature: 0.5,
    max_tokens: 4096,
  });

  const mdContent = completion.choices[0]?.message?.content;
  const outputFilePath = `build/how-to_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
  fs.writeFileSync(outputFilePath, mdContent);

  return mdContent;
}

// Fonction de gestion de la pagination
function generatePagination(page, totalPages) {
  let paginationHtml = '<nav><ul class="pagination">';
  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `<li class="page-item ${i === page ? 'active' : ''}"><a class="page-link" href="?page=${i}">${i}</a></li>`;
  }
  paginationHtml += '</ul></nav>';
  return paginationHtml;
}

// Fonction principale
async function main() {
  const subject = process.argv[2] || 'project_AL';
  const page = process.argv[3] || 1;
  await generateProjectHTML(subject, page);
}

main();
