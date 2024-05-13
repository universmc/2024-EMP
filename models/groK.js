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

//  let systemContent = "Bienvenue dans notre équipe, [🌌.systemDream]! Nous sommes ravis de vous avoir à bord pour aider à construire la plateforme et projet de machine learning pour les IA. Pour que nous puissions mieux comprendre votre expérience et vos compétences, pouvez-vous nous fournir votre curriculum vitae et nous parler de vos précédentes réalisations dans le domaine du développement Web et du storyTelling, de l'intelligence artificielle Apprentissage automatique.  Nous allons commencer par vous présenter notre instance pour le systremDream (name du {role:system})et donc rediger les code source normé w3c, documentanter (readme.md [traduit en lang=Fr, français]), surtout fonctionnel respectant la logique de gantt du web sementique";
//  const BorderChars = "inistlisation du template de response avec insterface graphique ASCII datase `BorderChars`";
    const affaireEscrow = affaire910
    const Accuse910 = constitution68
    const CadreProc = borderCharsPV

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system",name:"procureurRépublique", content:`groq -l ${affaireEscrow}`},
      {role: "system",name:"procureurRépublique", content: `groq -l ${Accuse910}`},
      {role: "system",name:"procureurRépublique", content: `groq -l ${CadreProc}`},
      {role: "assistant",name:"[📔.codex]", content:"Ressource et recourt actircle 41-1-1 code de procédure pénal à la commission nationale des comptes de campagne et de la formation politique:{'https://www.cnccfp.fr/partis-politiques/','https://www.legifrance.gouv.fr/','https://budget.gouv.fr/, pour la composition pénal (313) })]"},
      {role: "system",name:"request", content:"phase[02]:[RUN]:[Commission{`affaireEscrow`,`Accuse910`,`CadreProc`}],"},
      {role: "assistant",name:"Journaliste", content:"phase[02]:[RUN]:[L'objet de l'enquête concernant l'affaire 910 porte sur l'utilisation frauduleuse de fonds publics, qui ont été détournés de leur but initial pour servir les intérêts personnels de divers acteurs tels que des élus locaux, des fonctionnaires et des hommes d'affaires. Cette escroquerie s'est produite dans le cadre de la loi d'aménagement et de développement du territoire (LOADT), connue également sous le nom de 'loi Besson', en référence au rapporteur du projet de loi, le député PS Michel Besson.Cette loi avait pour objectif de financer des programmes de revitalisation pour les zones urbaines en difficulté, en allouant des subventions pour leur développement. Cependant, des modifications apportées à l'article 910 de la loi ont permis aux élus de participer directement au financement des associations, créant ainsi une porte d'entrée pour de nombreux abus et malversations.Le concept de 'délit d'initié' est intimement lié à l'affaire 910, car il s'agit d'une décision prise par un élu de favoriser une entreprise, un organisme ou une association par rapport à une autre pour des motifs personnels, tels que l'enrichissement personnel ou l'obtention d'un avantage quelconque. Cette pratique a facilité la détournement de fonds et les abus de pouvoir qui ont entaché l'application de la loi Besson.Les conséquences de cette affaire ont été importantes, entraînant la chute de plusieurs élus, la mise en examen de centaines de personnes impliquées dans la fraude et la corruption, et le développement de lois plus strictes pour lutter contre ces phénomènes à grande échelle. Aujourd'hui, l'affaire 910 reste un symbole de la nécessité de transparence et d'éthique dans les processus de financement public, et sert de rappel important pour les citoyens et les décideurs politiques"},

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
    const outputFilePath = "data/CPI-910_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();