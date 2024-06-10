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
    const Affaire_910 = `
    {
      "titre": "Mise à jour de l'affaire de scandale politique et financier",
      "sousSections": [
          {
              "sousTitre": "Commission d'enquête",
              "contenuMarkdown": "src/md/gen-doc-cnccfp.md",
              "details": [
                  "Présentation de la commission de campagne et de financement politique, sa mission de surveillance et de contrôle.",
                  "Dénonciation des pratiques suspectes de la \"macronie\" depuis 2017, avec un accent particulier sur l'article 49-3 de la Constitution française et son usage depuis 2008."
              ]
          },
          {
              "sousTitre": "Témoignages de victimes et personnes affectées",
              "contenuMarkdown": "src/md/témoignages.md",
              "details": [
                  "Réunir des témoignages de personnes précaires, vivant sous le seuil de pauvreté, touchées par la répression financière ou policière.",
                  "Mettre en avant les cas de mendiants de différents âges, ainsi que les témoignages de travailleurs avec des CDI mais sous le seuil de pauvreté."
              ]
          },
          {
              "sousTitre": "Chronologie des événements clés",
              "contenuMarkdown": "src/md/chronologie-macron.md",
              "details": "Détailler les événements importants depuis le début du mandat de Macron jusqu'à la fin, en incluant les manifestations des gilets jaunes, les réformes controversées, et les abus de pouvoir."
          },
          {
              "sousTitre": "Projet de réforme de la justice sociale",
              "contenuMarkdown": "src/md/réforme-justice-sociale.md",
              "details": [
                  "Expliquer le concept de \"plaidoirie sociale\" avec une utilisation de l'IA et du Machine Learning pour aider les victimes de l'escroquerie morale, de la répression financière et policière.",
                  "Décrire l'utilisation des codes pénaux et de procédure pénale pour faire respecter la justice sociale."
              ]
          },
          {
              "sousTitre": "Appel à la justice et à la transparence",
              "contenuMarkdown": "src/md/appel-justice-transparence.md",
              "details": [
              "Exiger une justice équitable et transparente pour tous les citoyens, en particulier les groupes vulnérables et les victimes de l'oppression économique et politique.",
              "Réaffirmer l'importance de la responsabilité et de la transparence dans la démocratie."
          ]
          }
          ]
      }
    `

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
      {role: "user",name:"procureurRépublique", content: Affaire_910},
      {role: "assistant",name:"[📔.codex]", content:"phase[01-1]:[RUN]:[tu as incarneras le rôle de journaliste dans cette instance groq-sdk dans ta mission enquêté sur 'git branch 'https://github.com/universmc/affaire_910' ladite Macronnie)]"},
      {role: "assistant",name:"[📔.codex]", content:"phase[01-2]:[RUN]:[Rapport et vue les elements du dossier ${Dossier} ? si Oui Rédigez le Le développement de la réponse au format HTML section par section`)]"},
      {role: "user",name:"[🌴.Groq]", content:`groq index.html`},
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
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "Journaliste1_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();