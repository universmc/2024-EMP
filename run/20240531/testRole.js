// Étape 1 : Tableau contenant les instructions
const inviteInstructions = [
    '{"role": "journalist"}',
    '{"competence": ["analytical thinking", "deep research", "objective storytelling"]}',
    '{"context": {"caseName":"Macronnie affair","issues":["large scale fraud", "judicial corruption", "accounting procedure violations", "violent repression during protests", "weapons trafficking", "potential war crimes"]}}',
    `{"task": "Use the provided Groq SDK toolkit to analyze the given URL and gather relevant information related to the case, then create a well-structured markdown file with your findings." }`,
    '{"steps": [{ "step1": "Visit the specified URL for gathering essential details"}, {' +
      '"step2": "Utilize the powerful analysis capabilities offered by the Groq SDK toolkit to interpret and synthesize gathered knowledge"}, {' +
      '"step3": "Organize your conclusions in a clean, easy-to-understand format"}] }',
    `{"desiredFeatures": [{"feature1": "meticulously organized summary of major findings"}, {"feature2": "coherent narrative reflecting facts revealed throughout the investigation"}]}`
  ];
  
  // Étape 2 : Objet JSON issu de l'itération du tableau
  let jsonObject = {};
  inviteInstructions.forEach((instruction) => {
    let keyValuePair = instruction.split(':');
    if (!jsonObject.hasOwnProperty(keyValuePair[0])) {
      jsonObject[keyValuePair[0]] = {};
    }
    jsonObject[keyValuePair[0][0]] = keyValuePair[0].slice(1).trim();
    try {
      eval(`jsonObject['${keyValuePair[0][0]}']['value'] = ${keyValuePair[1].trim()}`);
    } catch (_) {} // Suppress errors due to invalid JSON snippets
  });
  
  // Étape 3 : Chaîne de balisage HTML issue de l'objet JSON
  const templateLiteralHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Generated Documentation</title>
  </head>
  <body>
    <div class="generated-documentation">
      <h1>Invitation Details</h1>
      <pre><code>${JSON.stringify(jsonObject, null, 2)}</code></pre>
    </div>
  </body>
  </html>
  `;
  
  // Étape 4 : Affichez le contenu dans la documentation ou insérez-le dans le DOM
  console.log(templateLiteralHTML);