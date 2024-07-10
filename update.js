const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();



async function main() {

    const affaireEM = "git commit -m 'regulilèrement mis à jour' https://github.com/universmc/affaire_910";

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "assistant",name:"adopi", content:affaireEM},
      {role: "assistant",name:"adopi", content:"mise à jour du sommaire et j'interfaces graphiques présentation de l'affaire de fraude électorale datant du 9 juin 2024"},
      {role: "user",name:"Journaliste", content:"bonjou je suis journaliste, instruction > élaboration d'un plan de communication pour informer le public et les parties prenantes concernées de l'affaire et de ses conséquences mise a jours sur https://github.com/universmc/affaire_910 "},
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