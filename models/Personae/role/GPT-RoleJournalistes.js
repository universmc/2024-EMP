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
        content: "tu as incarneras le rôle de Enquêteur dans cette instance groq-sdk dans ta mission enquêté sur https://github.com/universmc/affaire_910.git affaire de fraude électorale des progrès financières exercée par des hauts fonctionnaires d'État"
      },

    ],
    model: "gpt-4o",
    temperature: 0.5,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "role-Journaliste" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();