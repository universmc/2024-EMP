const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const OpenAI = require("openai");
const puppeteer = require("puppeteer");

const openai = new OpenAI();

// Liste des preuves (parties politiques impliquées)
const Preuves = [
  {
    "parnom": "ENSEMBLE ! (MAJORITÉ PRÉSIDENTIELLE)",
    "parcode": "1378",
    "parsigle": "EMP",
    "Identif_RNA_num": "W922019372",
    "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W922019372",
    "parpost": "75008",
    "parccfp": "25/04/2022",
    "decision_2022": "Respect",
    "autoriser_a_financer": "Oui"
  },
  {
    "parnom": "RENAISSANCE",
    "parcode": "910",
    "commission": "cnccfp",
    "Identif_RNA_num": "W943004354",
    "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W943004354",
    "parpost": "75008",
    "parccfp": "07/03/2016",
    "decision_2022": "Respect",
    "autoriser_a_financer": "Oui"
  },
  {
    "parnom": "HORIZONS",
    "parcode": "1344",
    "parsigle": "",
    "Identif_RNA_num": "W751262401",
    "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|liste2|act|retourliste|tri||first|2640|last|3204|rows|15|mnu|fulltext&act=edit&id=W751262401",
    "Identif_RNA": "W751262401#http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|liste2|act|retourliste|tri||first|2640|last|3204|rows|15|mnu|fulltext&act=edit&id=W751262401#",
    "parpost": "75116",
    "parccfp": "18/10/2021",
    "parsortieloi": "",
    "eligible_ap": null,
    "decision_2022": "Respect",
    "motif_2022": "DC",
    "autoriser_a_financer": "Oui",
    "date_fin_sanctions_art_200": "",
    "date_fin_sanctions_ap": ""
},
{
    "parsigle": "EM!",
    "parnom": "LA_FRANCE_EN_MARCHE",
    "parcode": "910+718",
    "Identif_RNA_num": "W943004354",
    "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W943004354",
    "parpost": "75008",
    "parccfp": "07/03/2016",
    "decision_2022": "Fraude",
    "motif_2022": "rename",
    "autoriser_a_financer": "non"
},
{
    "parnom": "ELLES MARCHENT !",
    "parcode": "1402",
    "parsigle": "EM!",
    "Identif_RNA_num": "W751262286",
    "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W751262286",
    "Identif_RNA": "W751262286#http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W751262286#",
    "parpost": "75001",
    "parccfp": "23/05/2022",
    "parsortieloi": "",
    "eligible_ap": null,
    "decision_2022": "Non-respect",
    "motif_2022": "HD",
    "autoriser_a_financer": "Non",
    "date_fin_sanctions_art_200": "01/01/2025",
    "date_fin_sanctions_ap": ""
},
{
    "parnom": "ENSEMBLE",
    "parcode": "1196",
    "parsigle": "",
    "Identif_RNA_num": "W711005293",
    "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W711005293",
    "Identif_RNA": "W711005293#http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W711005293#",
    "parpost": "71200",
    "parccfp": "07/10/2019",
    "parsortieloi": "",
    "eligible_ap": null,
    "decision_2022": "Respect",
    "motif_2022": "DC",
    "autoriser_a_financer": "Oui",
    "date_fin_sanctions_art_200": "",
    "date_fin_sanctions_ap": ""
},
{
    "parnom": "ENSEMBLE_1",
    "parcode": "1160",
    "Identif_RNA_num": "W931021993",
    "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W931021993",
    "parpost": "93000",
    "parccfp": "27/05/2019",
    "decision_2022": "Respect",
    "autoriser_a_financer": "Oui"
},
{
  "parnom": "EN_MARCHE",
  "parcode": "910",
  "Identif_RNA_num": "W93100101993",
  "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W931021993",
  "parpost": "93000",
  "parccfp": "27/05/2017",
  "decision_2022": "Respect",
  "autoriser_a_financer": "Oui"
}
  // Ajoutez d'autres preuves ici si nécessaire
];

// Fonction pour analyser une preuve
async function analysePreuves(preuve) {
  const prompt = `
  Enquêteur IA, veuillez analyser les éléments de preuve suivants :
  - Preuve: ${preuve.parnom}
  - Code: ${preuve.parcode}
  - Dossier RNA: ${preuve.Identif_RNA_num}

  Quel est le statut actuel de l'enquête sur cette entité et quelles actions recommandez-vous pour avancer ?
  `;

  // Appel à OpenAI avec un prompt personnalisé
  const completion = await groq.chat.completions.create({
    model: "gemma2-9b-it",
    messages: [
      { role: "system", content: "Phase 1: Analyse des preuves" },
      { role: "user", content: prompt }
    ],
    max_tokens: 1500
  });

  const aiResponse = completion.choices[0]?.message?.content;

  // Écrire le résultat de l'analyse dans un fichier markdown
  const outputFilePath = `AnalysePreuves_${preuve.parcode}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
  fs.writeFileSync(outputFilePath, aiResponse);
  console.log(`Résultat de l'analyse pour ${preuve.parnom} enregistré dans ${outputFilePath}`);
}

// Fonction pour itérer à travers toutes les preuves
async function processAllPreuves() {
  for (const preuve of Preuves) {
    await analysePreuves(preuve);
  }
}

// Scraper des données médiatiques en temps réel (ex. Euronews)
async function scrapeMediaData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const headlines = Array.from(document.querySelectorAll("h1, h2")).map(h => h.textContent);
    return headlines;
  });

  await browser.close();
  return data;
}

// Analyse avec flux médiatique intégré
async function analyseAvecMedia(preuve) {
  const mediaData = await scrapeMediaData("https://euronews.com/france");

  const prompt = `
  Enquêteur IA, veuillez analyser les éléments de preuve suivants :
  - Preuve: ${preuve.parnom}
  - Code: ${preuve.parcode}
  - Dossier RNA: ${preuve.Identif_RNA_num}
  - Informations récentes des médias : ${mediaData.join(", ")}

  Quel est le statut actuel de l'enquête sur cette entité et quelles actions recommandez-vous pour avancer ?
  `;

  // Appel OpenAI avec un prompt personnalisé
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Phase 1: Analyse des preuves" },
      { role: "user", content: prompt }
    ],
    max_tokens: 4096
  });

  const aiResponse = completion.choices[0]?.message?.content;
  const outputFilePath = `AnalysePreuve_${preuve.parcode}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
  fs.writeFileSync(outputFilePath, aiResponse);
  console.log(`Résultat de l'analyse pour ${preuve.parnom} avec les médias récents enregistré dans ${outputFilePath}`);
}

// Fonction principale pour traiter toutes les preuves
async function main() {
  console.log("Initialisation de l'analyse des preuves...");
  await processAllPreuves();
  console.log("Analyse terminée.");
}

main();
