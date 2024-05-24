const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const affaire910 = `grief/*.`
const constitution68 = `grief/Affaire_910-ref-légal_dalloz.json`

const borderCharsPV = {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
    intersectionLeft: '╠',
    intersectionRight: '╣',
    intersectionTop: '╦',
    intersectionBottom: '╩',
    intersectionCross: '╬',
  };
  
async function main() {

    const grief = affaire910
    const Affaire_910 = constitution68
    const CadreProc = borderCharsPV
    const Dossier = `${grief}"+${constitution68}+${CadreProc}+${Affaire_910}`;
    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system", content: "Dossier de mise en état à joindre au grief `./grief/*`" },
      {role: "user",name:"procureurRépublique", content: `${Dossier}`},
      {role: "system", content: "groq -R `./grief/*`" },
      {role: "user",name:"procureurRépublique", content: `${CadreProc}`},
      {role: "user",name:"procureurRépublique", content: `${constitution68}`},
      {role: "user",name:"procureurRépublique", content: `${Affaire_910}`},
      {role: "assistant",name:"[📔.codex]", content:"phase[01-1]:[RUN]:[Rapport en vue des elements du dossier ${Dossier}`)]"},
      //  {role: "user",name:"[🌴.Groq]", content: BorderChars },
      //  {role: "user",name:"[🌴.Groq]", content: "groq`[📔.codex]`+`BorderChars`framWork.response" },rédige-moi un bilan de la faire en fonction du contenu 
      //  {role: "user",name:"[🌴.Groq]", content: BorderChars },
  //  {role: "assistant",name:"[💬.cloudQuantum]", content:"[start]:Trainning mode}"},
  //  {role: "user",name:"[🌴.Groq]", content: "`groq`" },
  //  {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[dial:conversation(message/response)entre(user/assistant))]"},
  //  {
  //    "role": "system",
  //    "content": "[zira]",
  //  },
  //  {
  //    "role": "user",
  //    "content": "[content]:template.response",
  //  },
  //  {
  //    "role": "assistant",
  //    "content": "groq response",
  //  },
  //  {role: "assistant",name:"[📔.codex]", content:"phase[01]:[END]:[brainstorming(session.timestamp)]"},
  //  {role: "system",name:"[📔.codex]", content:"`systemContent` genetation de la documention et traduction de la documentation en lang:Fr, Français:stp!"},
  //  {role: "system",name:"[🌌.systemDream]", content:"groq"},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.5,
    max_tokens: 2024,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "Journal_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();