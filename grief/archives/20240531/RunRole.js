const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const OpenAI = require("openai");

const openai = new OpenAI();


async function main() {
  const completion = await openai.chat.completions.create({

    messages: [

      {
        role: "system",
        content: "tu as incarneras le rôle de journaliste dans cette instance groq-sdk dans ta mission enquêté sur https://github.com/universmc/affaire_910 ladite Macronnie Tes réponses devront être encapsuler au format HTML pour un développement avec un modèle de grande section par section en respectant les normes du Web sémantique W3C https://archive.org"
      },

    ],
    model: "gpt-4o",
    temperature: 0.5,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "index" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();