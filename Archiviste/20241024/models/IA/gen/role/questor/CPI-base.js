const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const Grief = `grief/*.`
const affaire910 = `grief/910.json.`
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
      {role: "system",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system", content: "Dossier de mise en état à joindre au grief `{./grief/*}`" },
      {role: "system",name:"procureurRépublique", content:`groq -l ${affaireEscrow}`},
      {role: "system",name:"procureurRépublique", content: `groq -l ${Accuse910}`},
      {role: "system",name:"procureurRépublique", content: `groq -l ${CadreProc}`},
      {role: "system",name:"[📔.codex]", content:"init[`role:assistant,name:'Journaliste',content:'promptJournaliste'`]run[affaire `griel/910.json`] est un scandale politico-financier français, apparu dans les années 2008. Elle porte sur l'utilisation frauduleuse de fonds publics dans le cadre de la loi d'aménagement projet de reforme des loi finance recticatif, Projet de projet de loi mis en place après usage abusif en récidive légale de l'article 49 en aLinea trois de la constitution française de 2008 à 2024 (du nom de son rapporteur, le député PS Michel griel). La loi visait à financer des programmes de Capitalsation de Bank, des FONDs on été détournée par des élus locaux, haut fonctionnaires d'était et des hommes d'affaires, Consciencieux de leur stratégie politique qui se sont enrichis personnellement grâce aux subventions attribuées.L'affaire est souvent associée au concept de 'délit d'initié', qui consiste en une décision d'un élu de favoriser une entreprise, un organisme ou une association par rapport à une autre pour des motifs personnels, comme l'enrichissement personnel ou l'obtention d'un avantage quelconque. Le nom de l'affaire vient du fait que l'article 910 de la loi Besson a été modifié afin de permettre aux élus de participer au financement des associations, ouvrant ainsi la porte à de nombreux abus et malversations. Les conséquences de cette affaire ont été importantes, car elle a entraîné la chute de plusieurs élus, la mise en examen de centaines de personnes et le développement de lois plus strictes pour lutter contre la corruption et la fraude à grande échelle. L'affaire 910 est devenue un symbole de la nécessité de transparence et d'éthique dans les processus de financement public, et elle reste un rappel important pour les citoyens et les décideurs politiques impartie dans l affaire ou ledit partie Politique 910.json"},
      {role: "assistant",name:"Journaliste", content:"Bonjour nous allons procéder à l'inventaire du dossier /grief est apparaît étape par étape dans "},
      {role: "system",name:"TimeStamps", content: `groq -l ${Grief}`},
      {role: "system",name:"TimeStamps", content: "Rapport_313 Avril 2024 en fonction des elements du dossier ./grief/Temoignage/.*"},

      //  {role: "user",name:"[🌴.Groq]", content: BorderChars },
  //  {role: "user",name:"[🌴.userGroq]", content: "groq`[📔.codex]`+`BorderChars`framWork.response" },rédige-moi un bilan de la faire en fonction du contenu 
  //  {role: "assistant",name:"[💬.cloudQuantum]", content:"[start]:Trainning mode}"},
  //  {role: "user",name:"[🌴.userGroq]", content: "`groq`" },
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
    const outputFilePath = "data/CPI-law_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();