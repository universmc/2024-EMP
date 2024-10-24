const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const constitution68 = require("../../package.json")



async function main() {

    const Grief = `fetch(./grief/*)`
    const Mag = "affaire_contre_la_macronnie"
    const Affaire_910 = `
    {
      "titre": "Mise à jour de l'affaire de scandale politique et financier",
      "sousSections": [
          {
              "sousTitre": "Commission d'enquête",
              "details": [
                  "Présentation de la commission de campagne et de financement politique, ressource dalloz_2024 sa mission de surveillance et de contrôle.",
                  "Dénonciation des pratiques suspectes de la \"macronie\" depuis 2017, avec un accent particulier sur l'article 49-3 de la Constitution française et son usage depuis 2008."
              ]
          },
          {
              "sousTitre": "Témoignages de victimes et personnes affectées",
              "details": [
                  "Réunir des témoignages de personnes précaires, vivant sous le seuil de pauvreté, touchées par la répression financière ou policière.",
                  "Mettre en avant les cas de mendiants de différents âges, ainsi que les témoignages de travailleurs avec des CDI mais sous le seuil de pauvreté."
              ]
          },
          {
              "sousTitre": "Chronologie des événements clés",
              "details": "Détailler les événements importants depuis le début du mandat de Macron jusqu'à la fin, en incluant les manifestations des gilets jaunes, les réformes controversées, et les abus de pouvoir."
          },
          {
              "sousTitre": "Projet de réforme de la justice sociale",
              "details": [
                  "Expliquer le concept de \"plaidoirie sociale\" avec une utilisation de l'IA et du Machine Learning pour aider les victimes de l'escroquerie morale, de la répression financière et policière.",
                  "Décrire l'utilisation des codes pénaux et de procédure pénale pour faire respecter la justice sociale."
              ]
          },
          {
              "sousTitre": "Appel à la justice et à la transparence",
              "details": [
              "Exiger une justice équitable et transparente pour tous les citoyens, en particulier les groupes vulnérables et les victimes de l'oppression économique et politique.",
              "Réaffirmer l'importance de la responsabilité et de la transparence dans la démocratie."
          ]
          }
          ]
      }
    `

    const Dossier = `${Grief}"+${constitution68}+${Affaire_910}`;
    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system", content: "Dossier de mise en état à joindre au grief `./grief/*`" },
      {role: "assistant",name:"[📔.codex]", content:"phase[01-1]:[RUN]:[tu as incarneras le rôle de journaliste dans cette instance groq-sdk dans ta mission enquêté sur 'git branch 'https://github.com/universmc/affaire_910' ladite Macronnie)]"},
      {role: "user",name:"procureurRépublique", content: `${Mag}`},
      {role: "user",name:"procureurRépublique", content: `${Dossier}`},
      {role: "assistant",name:"[📔.codex]", content:"phase[01-2]:[RUN]:[developpment du Rapport et vue les elements du dossier ${Dossier} ?`)]"},
      {role: "user",name:"procureurRépublique", content: Affaire_910},
      {role: "system", content: "développer les fais de $affaire_910 en fonction des éléments à charge dans le répertoire ./grief" },
      {role: "assistant",name:"[📔.codex]", content:"phase[01-3]:[RUN]:[Rédigez Le développement de la réponse au format HTML section par section le style en CSS de la page doit être sur un fond grisonnant et orangé]"},
      {role: "user",name:"[🌴.Groq]", content:`groq index.html`},
    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 4096,
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