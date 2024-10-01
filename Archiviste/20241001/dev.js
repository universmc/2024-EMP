async function analysePreuves(preuve) {
  const prompt = `
  Enquêteur IA, veuillez analyser les éléments de preuve suivants :
  - Preuve: ${preuve.parnom}
  - Code: ${preuve.parcode}
  - Dossier RNA: ${preuve.Identif_RNA_num}

  Quel est le statut actuel de l'enquête sur cette entité et quelles actions recommandez-vous pour avancer ?
  `;

  // Appel OpenAI ou Groq avec un prompt personnalisé
  const completion = await openai.chat.completions.create({
    model: "gpt-4", // ou "gemma2-9b-it" selon la configuration
    messages: [{ role: "system", content: "Phase 1: Analyse des preuves" }, { role: "user", content: prompt }],
    max_tokens: 1500
  });

  const aiResponse = completion.choices[0]?.message?.content;

  // Écrire le résultat de l'analyse dans un fichier markdown
  const outputFilePath = "AnalysePreuve_" + preuve.parcode + "_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
  fs.writeFileSync(outputFilePath, aiResponse);
  console.log(`Résultat de l'analyse pour ${preuve.parnom} enregistré dans ${outputFilePath}`);
}

// Fonction pour itérer à travers toutes les preuves
async function processAllPreuves() {
  for (const preuve of Preuves) {
    await analysePreuves(preuve);
  }
}
