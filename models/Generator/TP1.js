const OpenAI = require("openai");
const openai = new OpenAI();
const Groq = require("groq-sdk");
const groq = new Groq();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const imagePrompts = {
  'wirefram_TP1': "Create a high-definition image representing a futuristic learning environment...",
  'wirefram_single_Page': "Illustrate a dynamic workplace where individuals collaborate on sustainable projects...",
  // Add remaining prompts...
};

// Fonction pour lire les rôles à partir d'un fichier JSON
function loadRoles(roleFileName) {
    const roleFilePath = path.join(__dirname, 'instance', roleFileName);
    const roleData = fs.existsSync(roleFilePath) ? fs.readFileSync(roleFilePath, 'utf8') : '{}';
    return JSON.parse(roleData);
}

// Exemple d'utilisation pour `role-system.json`
const rolesSystem = loadRoles('role-system.json');

async function generateImage(subject) {
  try {
    const prompt = imagePrompts[subject];
    if (!prompt) {
      console.error("No prompt found for the subject: ", subject);
      return null;
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",
    });

    const imageUrl = response.data[0].url;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const date = new Date().toISOString().split('T')[0];
    const fileName = `build/image_${subject}_${date}.webp`;
    fs.writeFileSync(fileName, imageResponse.data);

    console.log(`Image for ${subject} saved as ${fileName}`);
    return `/path/to/your/image/directory/${fileName}`; // Return full path
  } catch (error) {
    console.error("Error generating or saving the image:", error);
    return null;
  }
}

async function generateDocumentation(subject) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "assistant", content: `Generating a How-To guide for ${subject}...` },
    ],
    model: "gemma2-9b-it",
    temperature: 0.5,
    max_tokens: 4096,
  });

  const mdContent = completion.choices[0]?.message?.content;
  const outputFilePath = `build/how-to_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
  fs.writeFileSync(outputFilePath, mdContent);

  console.log(`How-To documentation for ${subject} saved as ${outputFilePath}`);
  return mdContent;
}

async function generateHTML(subject, userRole) {
  if (!rolesSystem.roles.some(role => role.name === userRole)) {
    console.error(`User role ${userRole} is not authorized to generate content.`);
    return;
  }

  const imageFileName = await generateImage(subject);
  const documentation = await generateDocumentation(subject);

  if (!imageFileName || !documentation) {
    console.error("Failed to generate HTML due to missing image or documentation.");
    return;
  }

  const title = `How-To Guide and Image for ${subject}`;
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <style>
      body { font-family: Arial, sans-serif; }
      .container { max-width: 800px; margin: 0 auto; padding: 20px; }
      .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
      .image-container { text-align: center; margin-bottom: 20px; }
      img { max-width: 100%; height: auto; }
      .description { font-size: 16px; line-height: 1.5; }
      .how-to { background-color: #f0f0f0; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
  <div class="container">
    <div class="title">${title}</div>
    <div class="image-container">
      <img src="${imageFileName}" alt="${subject}">
    </div>
    <div class="description">
      <p><strong>Description:</strong> ${imagePrompts[subject]}</p>
    </div>
    <div class="how-to">
      <h2>How-To Guide</h2>
      <pre>${documentation}</pre>
    </div>
  </div>
</body>
</html>
  `;

  const htmlFileName = `build/${subject}_howto_${new Date().toISOString().replace(/[-:TZ]/g, "")}.html`;
  fs.writeFileSync(htmlFileName, htmlContent);
  console.log(`HTML file for ${subject} saved as ${htmlFileName}`);
}

async function main() {
  const subject = process.argv[2] || 'AI';
  const userRole = process.argv[3] || 'user';

  await generateHTML(subject, userRole);
}

main();