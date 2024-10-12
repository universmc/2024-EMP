const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system",name:"Enquêteur", content: "ton rôle consiste à enquêter sur l'affaire de fraude électorale et les financements illégaux dans le contexte d'un scandale politique. Tu auras accès aux données de l'affaire et devras poser les questions appropriées pour rassembler des preuves."},
      {role: "assistant",name:"Enquêteur", content: "le juge de mise en état du dossier sera présent dans cette instance.js pour mettre à jour régulièrement le répertoire suivant https://github.com/universmc/affaire_910.git "},

    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 4096,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "enquete_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();