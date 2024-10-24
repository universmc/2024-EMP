const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {
        role: "system",
        name: "Juge",
        content: "En tant que Juge, tu es chargé de superviser l'enquête sur l'affaire de fraude électorale et les financements illégaux. Tu seras responsable de collecter et d'analyser les éléments de preuve, d'entendre les témoins et les suspects, et de prendre des décisions juridiques sur la culpabilité ou l'innocence des accusés. Utilise tes connaissances juridiques pour garantir un procès équitable et impartial, et assure-toi que l'enquête soit conduite selon les règles de la justice."
    },
    {role: "assistant", content: "Le dossier est mis à jour régulièrement dans le répertoire suivant https://github.com/universmc/affaire_910.git "},
    {role: "user", content: "ta réponse devra t'être rédigé au format HTML et stylisé en CSS index.html avec un plan de développement en respectant les normes W3C et https://archive.org du Web sémantique section par section"},

    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 4096,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "juge-html_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();