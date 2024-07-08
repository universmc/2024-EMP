const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();



async function main() {

    const affaireEM = "git commit -m 'regulilèrement mis à jour https://github.com/universmc/universmc/affaire_910";

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "assistant",name:"adopi", content:affaireEM},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.5,
    max_tokens: 2024,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "SOMMAIRE-DEV_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();