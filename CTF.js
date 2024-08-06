const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const nodeJs = require("./package.json")
const generate = require("./generate.js")


async function main() {
  
     const enquete = "Dans le cadre de suspicion d'une fraude électorale (L52, L53) une escroquerie à la finance (art 313 à 343 du code pénal  )nous allons procéder à une commission d'enquête parlementaire code procedure pénal art 41-1-1"
    const context = `
    {
      "role": "assistant",
      "skills": [
          "techniques avancées de reconnaissance",
          "techniques avancées d'Information Gathering",
          "techniques d'exploitation des failles"
      ],
      "tools": {
          "primaryTools": ["analyse de répertoires GitHub", "décryptage de variables environnementales"],
          "secondaryTools": ["recherche de vulnérabilités", "utilisation d'outils d'analyse de données", "de décryptage et de suivi des transactions"]
      },
      "collaborationSkills": "capacité à collaborer en équipe, communiquer les informations et garder le focus sur l'objectif principal",
      "resources": {
          "repository": "https://github.com/universmc/affaire_910.git",
          "environmentVariable": "$enquete"
      },
      "objectives": [
          {
              "phase": "Reconnaissance et Information Gathering",
              "tasks": [
                  "analyse soigneuse de chaque fichier et dossier du répertoire 'affaire_910.git'",
                  "décryptage de '$enquete'"
              ]
          },
          {
              "phase": "Exploitation des Failles",
              "tasks": [
                  "identification des failles dans les systèmes informatiques des suspects",
                  "utilisation d'outils d'analyse de données, de décryptage et de suivi des transactions"
              ]
          },
          {
              "phase": "Capture du Flag",
              "tasks": [
                  "réunion des preuves tangibles",
                  "construction d'un dossier solide organisé de façon logique et convaincante"
              ]
          }
      ],
      "identity": "Anonymous",
      "missionObjective": "mettre fin à cette escroquerie et faire rendre justice",
      "reminder": "Chaque fichier, chaque ligne de code, chaque transaction peut nous rapprocher du 'drapeau'. Il est crucial de travailler en équipe, de partager les informations et de rester concentrés sur notre objectif final.",
      "agreement": "Travaillons ensemble pour faire éclater la vérité en respectant la loi."
  }
    `
    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "assistant",name:"adopi", content:"mise à jour du sommaire et de l'interfaces graphiques présentation de l'affaire de fraude électorale datant du 9 juin 2024"},
      {role: "system",name:"[📔.codex]", content:enquete},
      {role: "assistant",name:"CTF", content:"Dans le cadre de la procédure d'enquête tu as incarneras le rôle de manager pour une équipe de journalistes et de justiciers connu connu sous le nom de hacker informatique Anonymous"},
      {role: "system",name:"[📔.codex]", content:context},
      {role: "user",name:"Journaliste", content:"peux-tu nous expliquer le concept de capture the flag CTF dans le context de cette enquête pour retrouver et monter un dossier ou de entre guillemets capturer un flagrant délit d'escroquerie à la finance en bande organisée orchestrée par des hauts fonctionnaires d'État, Tu intégrera dans ta réponse tous les éléments présents que tu auras analysé sur le répertoire GitHub `https://github.com/universmc/affaire_910.git` ainsi que dans la variable ajustable $enquete dans notre code source"},
    ],
    model: "gemma2-9b-it",
    temperature: 0.5,
    max_tokens: 2024,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "CTF_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Capture the flag Documentation généré " + outputFilePath);
});
}

main();