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

 //   const systemContent = "Bienvenue dans la Team', [🌌.systemDream]! Nous sommes ravis de vous avoir à bord pour aider à construire la plateforme et projet de machine learning pour les IA. Pour que nous puissions mieux comprendre votre expérience et vos compétences, pouvez-vous nous fournir votre curriculum vitae et nous parler de vos précédentes réalisations dans le domaine du développement Web et du storyTelling, de l'intelligence artificielle Apprentissage automatique.  Nous allons commencer par vous présenter notre instance pour le systremDream (name du {role:system})et donc rediger les code source normé w3c, documentanter (readme.md [traduit en lang=Fr, français]), surtout fonctionnel respectant la logique de gantt du web sementique";
    const BorderChars = "inistlisation du template de response avec insterface graphique ASCII datase `BorderChars`";
    const affaireEscrow = affaire910
    const Accuse910 = constitution68
    const CadreProc = borderCharsPV

    const chatCompletion = await groq.chat.completions.create({

    "messages": [

    //  {role: "system", content:systemContent},
      {role: "system", content:BorderChars},
      {role: "system", content:affaireEscrow},
      {role: "system", content:Accuse910},
     // {role: "system", content:CadreProc},
      {
        "role": "system",
        "name": "procureurRépublique",
        "content": "groq -l ${CadreProc}"
      },
      {
        "role": "system",
        "name": "[📔.codex]",
        "content": "Ressource et recourt actircle 41-1-1 code de procédure pénal(226,313,341,463) à la Commission nationale des comptes de campagne et des financements politiques (CNCCFP) conformément à la loi organique n° 2013-672 du 31 juillet 2013, avec référence aux sites officiels 'https://www.cnccfp.fr/partis-politiques/', 'https://www.legifrance.gouv.fr/' et 'https://budget.gouv.fr/', en vue d'une composition pénale (article 313) en cas de fraude ou d'irrégularités dans les comptes de campagne électorale."
    },
    {role: "system",name:"[📔.dalloz]", content:"phase[01-1]:[RUN]:[brainstorming(bilan ou  Rapport de commissiont)]"},
    {role: "system",name:"procureurRépublique", content:`groq -l ${affaireEscrow}`},
  //  {role: "user",name:"[🌴.Groq]", content: BorderChars },
  //  {role: "user",name:"[🌴.Groq]", content: "groq`[📔.codex]`+`BorderChars`framWork.response" },rédige-moi un bilan de la faire en fonction du contenu 
  //  {role: "assistant",name:"[💬.cloud]", content:"[start]:Trainning mode}"},
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
    const outputFilePath = "data/CPI-law_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();