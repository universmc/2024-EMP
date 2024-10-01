const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const borderChars = {
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
  
  const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system", content: "groq `910.Json`" },
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system", content: "groq `./910.Json`" },
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "assistant",name:"Mandataire", content:"groq -L, traduit et develleppe le document en FRANçais lang=Fr. "},
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[Commission plénière, recourt à actircle 41-1-1 code de procédure pénal à la commission nationale des comptes de campagne et de la fraude politique:{'https://www.cnccfp.fr/partis-politiques/','https://www.legifrance.gouv.fr/','https://budget.gouv.fr/ })]"},
      {role: "user",name:"DROIT", content:"Bonjour j'aimerais savoir comment créer une instance en faveur de la justice sociale en France 2024 avec la machine Learning DALLOZ (groq /GPT&Mistral Et les éditions livre ou MODEL de CODE de référence pour la justice pénale éditionhttps://www.dalloz.fr ?"},
      {role: "system", content: "groq `./Affaire-ref_dalloz.json!`)"},
      {role: "assistant",name:"magistrat", content:"groq -R"},
      {role: "system", content: "Numero de compte groq `910.json`)" },
      {role: "system", content: "TIMESTAMPS)" },
      {role: "assistant", content: "role:assistant 'magistrat', à la cours" },
      {role: "user",name:"DROIT", content: "comment je peux trouver des informations sur le compte 910 administré à la commission nationale des comptes de campagne de financement politique à la demande des inscrits Mandataires '1133' et '974' inscruts dans cette même liste ?`)" },
      {role: "user",name:"DROIT", content: "nous avons de graves suspicion, preve d'escroquerie à la finance en bande organisée des PREUVES, documents comptable et de la répression à main armée, exercée par les hauts fonctionnaires membres du parti politique en question(cpp:53,78 (Siège de ce réseau des haut fonctionnaire Imparti dans cette affaire à 55 rues faubourg Saint-Honoré Paris), suivit de trés Par le mandataire procureur de la république et le magistrat à la cour dans cette instance, nombreux sont les PV depuis l'année 2017" },
      {role: "system", content: "[📔.codex]:cpp 41-1-1" },
      {role:user,name:"Journaliste",content:'promptJournaliste'}
  //  {role: "user",name:"[🌴.Groq]", content: BorderChars },
  //  {role: "user",name:"[🌴.userGroq]", content: "groq`[📔.codex]`+`BorderChars`framWork.response" },
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
    temperature: 0.7,
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